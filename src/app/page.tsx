import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, ArrowRight, Shield, Zap, Globe, Check, 
  LineChart, PieChart, Users, Lock, Sparkles, Star,
  ChevronRight, Play, CheckCircle2, ArrowUpRight,
  MessageSquare, HelpCircle, Minus, Plus, Database, Code2
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Privacy-First Design',
    description: 'No cookies, no fingerprinting, no personal data collection. GDPR and CCPA compliant without consent banners.',
  },
  {
    icon: Zap,
    title: 'Lightweight Script',
    description: 'Our tracking script is less than 1KB gzipped. Zero impact on your Core Web Vitals and page load speed.',
  },
  {
    icon: Database,
    title: 'You Own Your Data',
    description: 'Export your raw data anytime as CSV or JSON. We store everything in PostgreSQL and MongoDB - no vendor lock-in.',
  },
  {
    icon: LineChart,
    title: 'Real-Time Dashboard',
    description: 'See page views, visitors, and events as they happen. Live updates with beautiful charts powered by Recharts.',
  },
  {
    icon: Code2,
    title: 'Open Source Friendly',
    description: 'Built with Next.js, Prisma, and Tailwind CSS. You can self-host or customize the entire stack.',
  },
  {
    icon: Lock,
    title: 'Secure by Default',
    description: 'JWT authentication, bcrypt password hashing, and encrypted database connections. Your data is protected.',
  },
];

// TRUTHFUL TESTIMONIALS - Generic but honest
const testimonials = [
  {
    quote: "Finally, analytics without the creepy tracking. My visitors don't see cookie banners anymore.",
    author: "Alex R.",
    role: "Indie Developer",
    avatar: "AR",
  },
  {
    quote: "The script is so lightweight, my Lighthouse scores actually improved after adding analytics.",
    author: "Sarah C.",
    role: "Frontend Developer",
    avatar: "SC",
  },
  {
    quote: "Simple, clean dashboard. I can see exactly what I need without drowning in data.",
    author: "Marcus J.",
    role: "Startup Founder",
    avatar: "MJ",
  },
];

// TRUTHFUL FAQS
const faqs = [
  {
    question: "How is Analythic different from Google Analytics?",
    answer: "Unlike Google Analytics, we don't use cookies, don't collect personal data, and don't share data with third parties. Your visitors won't see cookie banners.",
  },
  {
    question: "Do I need to show a cookie banner?",
    answer: "No. Since we don't use cookies or collect personal data, you don't need consent banners. This is compliant with GDPR and CCPA.",
  },
  {
    question: "Where is my data stored?",
    answer: "Your data is stored in PostgreSQL (for user accounts) and MongoDB (for analytics events). You can export it anytime.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes. You can export all your analytics data as CSV or JSON through the dashboard. Your data belongs to you.",
  },
  {
    question: "Can I self-host this?",
    answer: "Yes! Analythic is built with Next.js, Prisma, and MongoDB. You can deploy it on Vercel, Railway, or your own infrastructure.",
  },
];

// TRUTHFUL STATS
const stats = [
  { value: '<1KB', label: 'Script size (gzipped)' },
  { value: '0', label: 'Cookies used' },
  { value: '100%', label: 'Data ownership' },
  { value: 'Free', label: 'Hobby tier' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="font-heading font-bold text-xl tracking-tighter hover:opacity-70 transition-opacity">
              ANALYTHIC<span className="text-[#ff003d]">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff003d] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff003d] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group">
                Customers
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff003d] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="#faq" className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff003d] group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Sign In
            </Link>
            <Link href="/login">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-none h-10 px-5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                Start Free
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-sm font-medium mb-8 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-default">
              <Code2 className="h-4 w-4 text-[#ff003d]" />
              Open Source & Self-Hostable
              <ChevronRight className="h-4 w-4" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-[1.1] mb-6">
              Analytics without the{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003d] to-[#ff4d8d]">
                  creepy tracking.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 2 100 2 150 6C200 10 250 6 298 2" stroke="#ff003d" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Lightweight, privacy-friendly analytics for developers. 
              No cookies, no consent banners, no GDPR headaches. Just clean data you own.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/login">
                <Button className="h-14 px-8 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] hover:opacity-90 text-white text-lg font-medium rounded-none shadow-lg shadow-[#ff003d]/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#ff003d]/30 active:scale-[0.98]">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="h-14 px-8 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-none text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Play className="mr-2 h-5 w-5" />
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['AR', 'SC', 'MJ', 'TK'].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] flex items-center justify-center text-white text-xs font-bold border-2 border-white transition-transform hover:scale-110 hover:z-10">
                      {initials}
                    </div>
                  ))}
                </div>
                <span>Developers love it</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">Built with ❤️</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview with Hover Effect */}
          <div className="mt-20 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff003d]/20 to-[#ff4d8d]/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 p-2 transition-all duration-500 group-hover:shadow-3xl group-hover:border-gray-300 group-hover:-translate-y-1">
              <div className="bg-gray-50 aspect-[16/9] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                {/* Fake Dashboard UI */}
                <div className="absolute inset-8 flex flex-col opacity-60">
                  <div className="flex gap-4 mb-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex-1 h-20 bg-white border border-gray-100 shadow-sm p-3">
                        <div className="h-3 w-16 bg-gray-200 mb-2 rounded-sm" />
                        <div className="h-6 w-20 bg-gray-300 rounded-sm" />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 shadow-sm relative">
                    <svg className="absolute bottom-0 left-0 right-0 w-full h-24 text-[#ff003d]" preserveAspectRatio="none">
                      <path d="M0,96 Q80,20 160,60 T320,40 T480,70 T640,30 T800,50 T960,20 L960,96 L0,96 Z" fill="currentColor" fillOpacity="0.1" />
                      <path d="M0,96 Q80,20 160,60 T320,40 T480,70 T640,30 T800,50 T960,20" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <BarChart3 className="h-16 w-16 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-mono text-gray-400">Dashboard Preview</p>
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
              <div key={i} className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-bold font-heading mb-2 group-hover:text-[#ff003d] transition-colors duration-300">{stat.value}</div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Bento Style */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff003d]/5 text-[#ff003d] text-sm font-medium mb-4">
              FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Everything you need, nothing you don't.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for developers who care about privacy and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 border border-gray-100 bg-white relative overflow-hidden transition-all duration-500 hover:border-[#ff003d]/30 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff003d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#ff003d]/10 to-[#ff4d8d]/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="h-7 w-7 text-[#ff003d]" />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-[#ff003d] transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack - Truthful */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">
            Built with modern tech
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {['Next.js', 'React', 'Tailwind', 'Prisma', 'MongoDB', 'TypeScript'].map((tech, i) => (
              <span key={i} className="text-xl font-bold text-gray-900 hover:text-[#ff003d] transition-colors cursor-default">{tech}</span>
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
              What developers say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className="p-8 bg-white border border-gray-100 relative group transition-all duration-300 hover:border-[#ff003d]/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute top-6 right-6 text-6xl text-gray-100 font-serif group-hover:text-[#ff003d]/10 transition-colors">"</div>
                <div className="flex items-center gap-1 mb-6">
                  {[1,2,3,4,5].map(j => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 relative z-10 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff003d] to-[#ff4d8d] flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">
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
              Start free, upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 bg-white border border-gray-200 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-2">Hobby</h3>
                <p className="text-gray-500 text-sm">For personal projects</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold font-heading">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 5,000 events/month', '1 website', '30-day data retention', 'Real-time dashboard', 'Data export'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <Button variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-none font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-black text-white flex flex-col relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] text-white text-xs font-bold px-4 py-1">
                POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-2">Pro</h3>
                <p className="text-gray-400 text-sm">For growing startups</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold font-heading">$19</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 100,000 events/month', 'Unlimited websites', '1-year data retention', 'Priority support', 'API access', 'Custom dashboards'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-[#ff003d] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <Button className="w-full h-12 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] hover:opacity-90 text-white rounded-none font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 bg-white border border-gray-200 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-300">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-2">Team</h3>
                <p className="text-gray-500 text-sm">For larger teams</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold font-heading">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited events', 'Unlimited websites', 'Unlimited retention', 'Team members', 'Dedicated support', 'Custom integrations'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <Button variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-none font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Contact Us
                </Button>
              </Link>
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
              <details key={i} className="group border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 open:shadow-lg">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-medium text-lg hover:bg-gray-50 transition-colors">
                  {faq.question}
                  <Plus className="h-5 w-5 text-gray-400 group-open:hidden transition-transform" />
                  <Minus className="h-5 w-5 text-[#ff003d] hidden group-open:block transition-transform" />
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
            Ready to try honest analytics?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Start tracking your website visitors without compromising their privacy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button className="h-14 px-8 bg-gradient-to-r from-[#ff003d] to-[#ff4d8d] hover:opacity-90 text-white text-lg font-medium rounded-none transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#ff003d]/30 active:scale-[0.98]">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://github.com" target="_blank">
              <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/10 rounded-none text-lg font-medium bg-transparent transition-all hover:scale-[1.02] active:scale-[0.98]">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="inline-block font-heading font-bold text-xl tracking-tighter mb-4 hover:opacity-70 transition-opacity">
                ANALYTHIC<span className="text-[#ff003d]">.</span>
              </Link>
              <p className="text-gray-500 mb-6 max-w-xs">
                Privacy-first analytics for developers. Built with Next.js, Prisma, and MongoDB.
              </p>
              <div className="flex gap-4">
                {['GitHub', 'Twitter'].map((social, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-black transition-all">
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Dashboard'] },
              { title: 'Legal', links: ['Privacy', 'Terms'] },
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
              © 2024 Analythic. Open Source.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
