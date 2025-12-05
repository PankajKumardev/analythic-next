import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing.</h2>
          <p className="text-neutral-500 text-lg">Start for free, upgrade as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Hobby */}
          <div className="p-8 rounded-xl border border-neutral-200 bg-white">
            <h3 className="text-xl font-bold mb-2">Hobby</h3>
            <div className="mb-6"><span className="text-4xl font-bold">$0</span><span className="text-neutral-500">/mo</span></div>
            <p className="text-neutral-500 text-sm mb-8">Perfect for side projects and personal sites.</p>
            <button className="w-full py-3 rounded-lg border border-neutral-200 font-bold text-ink hover:bg-neutral-50 transition-colors mb-8">
              Get Started
            </button>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Up to 3,000 pageviews/mo</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>1 Website</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Data retention: 1 month</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Community Support</span>
              </li>
            </ul>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-xl border-2 border-pulse bg-white shadow-soft-red relative transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-pulse text-white text-xs font-bold uppercase tracking-wider rounded-full">
                Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <div className="mb-6"><span className="text-4xl font-bold">$19</span><span className="text-neutral-500">/mo</span></div>
            <p className="text-neutral-500 text-sm mb-8">For serious creators and startups.</p>
            <button className="w-full py-3 rounded-lg bg-red-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all mb-8">
              Start Free Trial
            </button>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Up to 100,000 pageviews/mo</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Unlimited Websites</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Data retention: 12 months</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Email Support</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Export Data API</span>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div className="p-8 rounded-xl border border-neutral-200 bg-white">
            <h3 className="text-xl font-bold mb-2">Team</h3>
            <div className="mb-6"><span className="text-4xl font-bold">$49</span><span className="text-neutral-500">/mo</span></div>
            <p className="text-neutral-500 text-sm mb-8">For agencies and larger teams.</p>
            <button className="w-full py-3 rounded-lg bg-ink text-white font-bold hover:bg-neutral-800 transition-colors mb-8">
              Contact Sales
            </button>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Unlimited pageviews</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Unlimited Team Members</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Custom Data Retention</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Priority Support</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-pulse" /> <span>Self-hosting assistance</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
