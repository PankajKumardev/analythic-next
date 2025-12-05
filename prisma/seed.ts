import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
  console.log('✅ Created user:', user.email);

  // Create a test organization
  const org = await prisma.organization.upsert({
    where: { slug: 'test-org' },
    update: {},
    create: {
      name: 'Test Organization',
      slug: 'test-org',
      planTier: 'FREE',
      monthlyLimit: 5000,
      users: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });
  console.log('✅ Created organization:', org.name);

  // Create a test project
  const project = await prisma.project.upsert({
    where: { writeKey: 'test-write-key-12345' },
    update: {},
    create: {
      name: 'My Test Site',
      domain: 'localhost',
      writeKey: 'test-write-key-12345',
      orgId: org.id,
    },
  });
  console.log('✅ Created project:', project.name);
  console.log('');
  console.log('📋 Test Credentials:');
  console.log('─────────────────────────────────────');
  console.log('Write Key (for tracker.js):', project.writeKey);
  console.log('Project ID:', project.id);
  console.log('Organization ID:', org.id);
  console.log('');
  console.log('🧪 Test the tracker at: http://localhost:3000/test.html');
  console.log('   Update data-key attribute to:', project.writeKey);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
