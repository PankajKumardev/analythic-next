import React from 'react';
import { Check, X, Shield } from 'lucide-react';

const Comparison = () => {
  return (
    <section className="py-24 px-6 bg-background border-b border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
                <Shield size={14} className="text-foreground" />
                <span className="text-xs font-mono font-medium text-subtle">The Privacy Advantage</span>
            </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Why switch?</h2>
          <p className="text-subtle text-lg">See how Analythic compares to the industry standard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-2xl overflow-hidden shadow-sm">
            
            {/* Headers / Labels Column */}
            <div className="hidden md:block bg-surface p-8 border-r border-border">
                <div className="h-12 mb-8"></div> {/* Spacer for alignment */}
                <div className="space-y-8 font-medium text-subtle">
                    <div className="flex items-center h-8">Script Size</div>
                    <div className="flex items-center h-8">Cookies</div>
                    <div className="flex items-center h-8">GDPR Compliance</div>
                    <div className="flex items-center h-8">Data Ownership</div>
                    <div className="flex items-center h-8">Setup Time</div>
                </div>
            </div>

            {/* Google Analytics Column */}
            <div className="bg-surface/30 p-8 border-r border-border relative group">
                <div className="h-12 mb-8 flex items-center gap-3">
                    <div className="font-bold text-xl text-subtle">Google Analytics 4</div>
                </div>
                
                {/* Mobile Labels (Only visible on small screens) */}
                <div className="md:hidden space-y-8">
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">Script Size</span>
                        <span className="font-mono text-subtle">45KB+</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">Cookies</span>
                        <span className="text-subtle">Yes</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">GDPR</span>
                        <span className="text-subtle">Complex</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">Ownership</span>
                        <span className="text-subtle">Google&apos;s</span>
                     </div>
                     <div className="flex justify-between items-center h-8 pb-2">
                        <span className="text-subtle">Setup</span>
                        <span className="text-subtle">Hours</span>
                     </div>
                </div>

                {/* Desktop Values */}
                <div className="hidden md:block space-y-8">
                    <div className="flex items-center h-8 font-mono text-subtle">45KB+ (Heavy)</div>
                    <div className="flex items-center h-8 text-subtle"><X size={18} className="mr-2" /> Yes</div>
                    <div className="flex items-center h-8 text-subtle"><X size={18} className="mr-2" /> Complex</div>
                    <div className="flex items-center h-8 text-subtle">Google&apos;s</div>
                    <div className="flex items-center h-8 text-subtle">Hours</div>
                </div>
            </div>

            {/* Analythic Column */}
            <div className="bg-background p-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-pulse"></div>
                <div className="h-12 mb-8 flex items-center gap-3">
                    <div className="font-bold text-xl text-foreground">Analythic</div>
                    <span className="bg-pulse/10 text-pulse text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Better</span>
                </div>

                {/* Mobile Labels (Only visible on small screens) */}
                <div className="md:hidden space-y-8">
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">Script Size</span>
                        <span className="font-mono font-bold text-foreground">&lt; 1KB</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">Cookies</span>
                        <span className="font-bold text-foreground">None</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">GDPR</span>
                        <span className="font-bold text-foreground">100% Compliant</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-border pb-2">
                        <span className="text-subtle">Ownership</span>
                        <span className="font-bold text-foreground">Yours</span>
                     </div>
                     <div className="flex justify-between items-center h-8 pb-2">
                        <span className="text-subtle">Setup</span>
                        <span className="font-bold text-foreground">2 Minutes</span>
                     </div>
                </div>

                 {/* Desktop Values */}
                 <div className="hidden md:block space-y-8">
                    <div className="flex items-center h-8 font-mono font-bold text-foreground">&lt; 1KB (Ultralight)</div>
                    <div className="flex items-center h-8 font-bold text-foreground"><Check size={18} className="text-pulse mr-2" /> None</div>
                    <div className="flex items-center h-8 font-bold text-foreground"><Check size={18} className="text-pulse mr-2" /> 100% Compliant</div>
                    <div className="flex items-center h-8 font-bold text-foreground">Yours (Portable)</div>
                    <div className="flex items-center h-8 font-bold text-foreground">2 Minutes</div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;


