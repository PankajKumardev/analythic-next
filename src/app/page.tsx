import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, ArrowRight, Shield, Zap, Globe, Check, 
  LineChart, PieChart, Users, Lock, Sparkles, Star,
  ChevronRight, Play, CheckCircle2, ArrowUpRight,
  MessageSquare, HelpCircle, Minus, Plus
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Privacy-First Architecture',
    description: 'No cookies, no fingerprinting, no personal data collection. Fully GDPR, CCPA, and PECR compliant out of the box.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Our tracking script is less than 1KB. Zero impact on your Core Web Vitals and page load speed.',
  },
  {
    icon: Globe,
    title: 'Global Edge Network',
    description: 'Data processed at 200+ edge locations worldwide. Sub-50ms response times guaranteed.',
  },
  {
    icon: LineChart,
    title: 'Real-Time Analytics',
    description: 'See your visitors as they happen. Live dashboard updates every second with zero delay.',
  },
  {
    icon: PieChart,
    title: 'Smart Insights',
    description: 'AI-powered insights automatically surface trends, anomalies, and opportunities in your data.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified. End-to-end encryption. Your data never leaves your control.',
  },
];

const testimonials = [
  {
    quote: "Analythic replaced Google Analytics for us overnight. The privacy compliance alone saved us 40 hours of legal work.",
    author: "Sarah Chen",
    role: "CTO at TechFlow",
    avatar: "SC",
  },
  {
    quote: "We saw a 23% improvement in Core Web Vitals after switching. The script is incredibly lightweight.",
    author: "Marcus Johnson",
    role: "Engineering Lead at Stripe",
    avatar: "MJ",
  },
  {
    quote: "The real-time dashboard is game-changing. We can see the impact of our marketing campaigns instantly.",
    author: "Elena Rodriguez",
    role: "Head of Growth at Linear",
    avatar: "ER",
  },
];

const faqs = [
  {
    question: "How is Analythic different from Google Analytics?",
    answer: "Unlike Google Analytics, we don't use cookies, don't collect personal data, and are fully GDPR compliant. Your visitors don't need to see cookie banners, and you don't need a privacy policy update.",
  },
  {
    question: "Do I need to show a cookie banner?",
    answer: "No. Since we don't use cookies or collect personal data, you don't need to show any cookie consent banners to your visitors.",
  },
  {
    question: "Where is my data stored?",
    answer: "Your data is stored in encrypted databases across our global edge network. We use industry-leading security practices and are SOC 2 Type II certified.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes. You can export all your data at any time in CSV, JSON, or connect via our API. Your data belongs to you.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you reach 80% of your limit. If you exceed, we don't cut you off – we'll simply suggest upgrading. No data loss, ever.",
  },
];

const stats = [
  { value: '50M+', label: 'Events tracked daily' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '10K+', label: 'Companies trust us' },
  { value: '<1KB', label: 'Script size' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="font-heading font-bold text-xl tracking-tighter">
              ANALYTHIC<span className="text-[#ff003d]">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Customers
              </Link>
              <Link href="#faq" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Sign In
            </Link>
            <Link href="/login">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-none h-10 px-5 text-sm font-medium">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-glow opacity-10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4 text-[#ff003d]" />
              Now with AI-powered insights
              <ChevronRight className="h-4 w-4" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-[1.1] mb-6">
              Analytics that respect{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]">
                  your users
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 2 100 2 150 6C200 10 250 6 298 2" stroke="#ff003d" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get powerful insights without compromising privacy. No cookies, no consent banners, 
              no GDPR headaches. Just clean, actionable data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/login">
                <Button className="h-14 px-8 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] hover:opacity-90 text-white text-lg font-medium rounded-none shadow-lg shadow-[#ff003d]/20">
                  Start your free trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="h-14 px-8 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none text-lg font-medium">
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['SC', 'MJ', 'ER', 'TK'].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <span>10,000+ teams</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff003d]/20 to-[#ff4d8d]/20 blur-3xl opacity-30" />
            <div className="relative border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 p-2">
              <div className="bg-gray-50 aspect-[16/9] flex items-center justify-center relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-center">
                  <BarChart3 className="h-20 w-20 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm font-mono text-gray-400">Interactive Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-heading mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff003d]/5 text-[#ff003d] text-sm font-medium mb-4">
              FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Everything you need to understand your users
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful analytics tools that don't compromise on privacy or performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group p-8 border border-gray-100 hover:border-gray-200 bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[#ff003d]/10 to-[#ff4d8d]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-[#ff003d]" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Logos */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {['vercel', 'stripe', 'linear', 'notion', 'figma', 'slack'].map((company, i) => (
              <span key={i} className="text-2xl font-bold text-gray-900">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff003d]/5 text-[#ff003d] text-sm font-medium mb-4">
              TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Loved by thousands of teams
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-8 bg-white border border-gray-100 relative">
                <div className="absolute top-6 right-6 text-6xl text-gray-100 font-serif">"</div>
                <div className="flex items-center gap-1 mb-6">
                  {[1,2,3,4,5].map(j => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 relative z-10 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff003d]/5 text-[#ff003d] text-sm font-medium mb-4">
              PRICING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 bg-white border border-gray-200 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-2">Hobby</h3>
                <p className="text-gray-500 text-sm">For personal projects and small sites</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold font-heading">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 5,000 events/month', '1 website', '30-day data retention', 'Basic analytics', 'Community support'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-none font-medium">
                Get Started Free
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-black text-white flex flex-col relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white text-xs font-bold px-4 py-1">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-2">Pro</h3>
                <p className="text-gray-400 text-sm">For growing businesses</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold font-heading">$29</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 100,000 events/month', 'Unlimited websites', '1-year data retention', 'Advanced analytics', 'Priority email support', 'Custom dashboards', 'API access'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-[#ff003d] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-12 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] hover:opacity-90 text-white rounded-none font-medium">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 bg-white border border-gray-200 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-2">Enterprise</h3>
                <p className="text-gray-500 text-sm">For large organizations</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold font-heading">$99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited events', 'Unlimited websites', 'Unlimited data retention', 'White-label dashboards', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'SSO/SAML'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-none font-medium">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff003d]/5 text-[#ff003d] text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 bg-white">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-medium text-lg hover:bg-gray-50">
                  {faq.question}
                  <Plus className="h-5 w-5 text-gray-400 group-open:hidden" />
                  <Minus className="h-5 w-5 text-gray-400 hidden group-open:block" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-glow opacity-20 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Ready to respect your users' privacy?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join 10,000+ companies using Analythic. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button className="h-14 px-8 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] hover:opacity-90 text-white text-lg font-medium rounded-none">
                Start your free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/10 rounded-none text-lg font-medium bg-transparent">
              Talk to sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="inline-block font-heading font-bold text-xl tracking-tighter mb-4">
                ANALYTHIC<span className="text-[#ff003d]">.</span>
              </Link>
              <p className="text-gray-500 mb-6 max-w-xs">
                Privacy-first analytics for modern teams. GDPR compliant by design.
              </p>
              <div className="flex gap-4">
                {['twitter', 'github', 'linkedin'].map((social, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                    {social[0].toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'DPA', 'Security'] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-500 hover:text-black transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Analythic Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
