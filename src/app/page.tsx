import {
  Navbar,
  Hero,
  StackTicker,
  Features,
  Comparison,
  Integration,
  Testimonials,
  OpenSource,
  Pricing,
  FAQ,
  CTA,
  Footer
} from '@/components/landing';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <StackTicker />
        <Features />
        <Comparison />
        <Integration />
        <Testimonials />
        <OpenSource />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

