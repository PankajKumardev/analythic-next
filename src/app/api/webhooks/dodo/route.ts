import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

/**
 * Verify webhook signature from Dodo
 */
function verifyWebhookSignature(payload: string, signature: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.DODO_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1. Get raw body and signature
    const body = await req.text();
    const signature = req.headers.get('x-dodo-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // 2. Verify webhook signature (Security!)
    const isValid = verifyWebhookSignature(body, signature);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // 3. Parse the event
    const event = JSON.parse(body);
    console.log('Webhook received:', event.type);

    // 4. Handle payment success
    if (event.type === 'payment.succeeded') {
      const { metadata, subscription_id, customer_id, current_period_end } = event.data;
      const orgId = metadata?.orgId;

      if (!orgId) {
        console.error('Missing orgId in webhook metadata');
        return NextResponse.json(
          { error: 'Missing orgId' },
          { status: 400 }
        );
      }

      // 5. Upgrade organization to PRO
      await prisma.organization.update({
        where: { id: orgId },
        data: {
          planTier: 'PRO',
          monthlyLimit: 100000, // 100k events per month
        }
      });

      // 6. Save subscription details
      await prisma.subscription.upsert({
        where: { orgId },
        create: {
          orgId,
          subscriptionId: subscription_id,
          customerId: customer_id,
          status: 'active',
          currentPeriodEnd: new Date(current_period_end * 1000)
        },
        update: {
          subscriptionId: subscription_id,
          status: 'active',
          currentPeriodEnd: new Date(current_period_end * 1000)
        }
      });

      console.log(`✅ Upgraded organization ${orgId} to PRO`);
    }

    // 7. Handle subscription cancellation
    if (event.type === 'subscription.cancelled') {
      const { metadata } = event.data;
      const orgId = metadata?.orgId;

      if (orgId) {
        await prisma.organization.update({
          where: { id: orgId },
          data: {
            planTier: 'FREE',
            monthlyLimit: 5000
          }
        });

        await prisma.subscription.update({
          where: { orgId },
          data: { status: 'cancelled' }
        });

        console.log(`⚠️ Downgraded organization ${orgId} to FREE`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
