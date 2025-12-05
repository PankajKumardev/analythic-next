import React from 'react';
import { Terminal, Code, Cpu } from 'lucide-react';

const testimonials = [
  {
    quote: "Finally, analytics that don't feel like spyware. The dashboard is cleaner than my IDE theme.",
    author: "Sarah J.",
    role: "Frontend Lead",
    company: "Vercel",
    icon: <Terminal size={18} className="text-subtle" />
  },
  {
    quote: "We dropped Google Analytics for this. Our lighthouse score went from 82 to 99 immediately.",
    author: "David Chen",
    role: "CTO",
    company: "Startup Inc.",
    icon: <Cpu size={18} className="text-subtle" />
  },
  {
    quote: "The only analytics tool I've used that actually respects user privacy by default. Integration took 30 seconds.",
    author: "Alex M.",
    role: "Indie Hacker",
    company: "ShipFast",
    icon: <Code size={18} className="text-subtle" />
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Devs are switching.</h2>
                <p className="text-subtle">Join 4,000+ developers reclaiming their data.</p>
            </div>
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-pulse animate-pulse"></div>
                <span className="text-xs font-mono text-subtle uppercase tracking-widest">Live Feedback</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div 
                key={i} 
                className="bg-background p-8 rounded-xl border border-border hover:border-border transition-all hover:shadow-sharp group"
            >
              <div className="mb-6">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center border border-border group-hover:border-border transition-colors">
                    {t.icon}
                </div>
              </div>
              <p className="text-lg text-foreground font-medium mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-subtle">
                    {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground">{t.author}</div>
                  <div className="text-xs text-subtle">{t.role} @ {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


