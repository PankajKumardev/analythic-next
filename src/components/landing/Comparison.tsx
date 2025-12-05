import React from 'react';
import { Check, X, Shield } from 'lucide-react';

const Comparison = () => {
  return (
    <section className="py-24 px-6 bg-white border-b border-neutral-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-neutral-200 mb-6">
                <Shield size={14} className="text-ink" />
                <span className="text-xs font-mono font-medium text-neutral-600">The Privacy Advantage</span>
            </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Why switch?</h2>
          <p className="text-neutral-500 text-lg">See how Analythic compares to the industry standard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            
            {/* Headers / Labels Column */}
            <div className="hidden md:block bg-surface p-8 border-r border-neutral-200">
                <div className="h-12 mb-8"></div> {/* Spacer for alignment */}
                <div className="space-y-8 font-medium text-neutral-500">
                    <div className="flex items-center h-8">Script Size</div>
                    <div className="flex items-center h-8">Cookies</div>
                    <div className="flex items-center h-8">GDPR Compliance</div>
                    <div className="flex items-center h-8">Data Ownership</div>
                    <div className="flex items-center h-8">Setup Time</div>
                </div>
            </div>

            {/* Google Analytics Column */}
            <div className="bg-surface/30 p-8 border-r border-neutral-200 relative group">
                <div className="h-12 mb-8 flex items-center gap-3">
                    <div className="font-bold text-xl text-neutral-400">Google Analytics 4</div>
                </div>
                
                {/* Mobile Labels (Only visible on small screens) */}
                <div className="md:hidden space-y-8">
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-200 pb-2">
                        <span className="text-neutral-500">Script Size</span>
                        <span className="font-mono text-neutral-400">45KB+</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-200 pb-2">
                        <span className="text-neutral-500">Cookies</span>
                        <span className="text-neutral-400">Yes</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-200 pb-2">
                        <span className="text-neutral-500">GDPR</span>
                        <span className="text-neutral-400">Complex</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-200 pb-2">
                        <span className="text-neutral-500">Ownership</span>
                        <span className="text-neutral-400">Google&apos;s</span>
                     </div>
                     <div className="flex justify-between items-center h-8 pb-2">
                        <span className="text-neutral-500">Setup</span>
                        <span className="text-neutral-400">Hours</span>
                     </div>
                </div>

                {/* Desktop Values */}
                <div className="hidden md:block space-y-8">
                    <div className="flex items-center h-8 font-mono text-neutral-400">45KB+ (Heavy)</div>
                    <div className="flex items-center h-8 text-neutral-400"><X size={18} className="mr-2" /> Yes</div>
                    <div className="flex items-center h-8 text-neutral-400"><X size={18} className="mr-2" /> Complex</div>
                    <div className="flex items-center h-8 text-neutral-400">Google&apos;s</div>
                    <div className="flex items-center h-8 text-neutral-400">Hours</div>
                </div>
            </div>

            {/* Analythic Column */}
            <div className="bg-white p-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-pulse"></div>
                <div className="h-12 mb-8 flex items-center gap-3">
                    <div className="font-bold text-xl text-ink">Analythic</div>
                    <span className="bg-pulse/10 text-pulse text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Better</span>
                </div>

                {/* Mobile Labels (Only visible on small screens) */}
                <div className="md:hidden space-y-8">
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-100 pb-2">
                        <span className="text-neutral-500">Script Size</span>
                        <span className="font-mono font-bold text-ink">&lt; 1KB</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-100 pb-2">
                        <span className="text-neutral-500">Cookies</span>
                        <span className="font-bold text-ink">None</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-100 pb-2">
                        <span className="text-neutral-500">GDPR</span>
                        <span className="font-bold text-ink">100% Compliant</span>
                     </div>
                     <div className="flex justify-between items-center h-8 border-b border-dashed border-neutral-100 pb-2">
                        <span className="text-neutral-500">Ownership</span>
                        <span className="font-bold text-ink">Yours</span>
                     </div>
                     <div className="flex justify-between items-center h-8 pb-2">
                        <span className="text-neutral-500">Setup</span>
                        <span className="font-bold text-ink">2 Minutes</span>
                     </div>
                </div>

                 {/* Desktop Values */}
                 <div className="hidden md:block space-y-8">
                    <div className="flex items-center h-8 font-mono font-bold text-ink">&lt; 1KB (Ultralight)</div>
                    <div className="flex items-center h-8 font-bold text-ink"><Check size={18} className="text-pulse mr-2" /> None</div>
                    <div className="flex items-center h-8 font-bold text-ink"><Check size={18} className="text-pulse mr-2" /> 100% Compliant</div>
                    <div className="flex items-center h-8 font-bold text-ink">Yours (Portable)</div>
                    <div className="flex items-center h-8 font-bold text-ink">2 Minutes</div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;
