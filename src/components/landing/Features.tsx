'use client';

import React from 'react';
import { Shield, Zap, Database, Activity, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-pulse rounded-full"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Core Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            Data intelligence, <br />
            <span className="text-neutral-400">minus the surveillance.</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed">
            Built for developers who value <span className="text-ink font-medium">precision</span> over bloat and <span className="text-ink font-medium">privacy</span> over profit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Card 1: Privacy (Large) - Structural/Vault Look */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-2 relative p-8 md:p-10 rounded-none border border-neutral-200 bg-white hover:border-neutral-300 transition-colors group overflow-hidden"
          >
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-neutral-300"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-neutral-300"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-neutral-300"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-neutral-300"></div>

            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 border border-neutral-100 bg-surface flex items-center justify-center">
                  <Lock size={20} className="text-ink" />
                </div>
                <div className="px-3 py-1 bg-surface border border-neutral-100 rounded-full">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">GDPR Compliant</span>
                </div>
              </div>

              <div className="mt-8">
                 <h3 className="text-2xl font-bold mb-3 group-hover:text-pulse transition-colors">Zero PII Collected.</h3>
                 <p className="text-neutral-500 leading-relaxed max-w-lg">
                   We don&apos;t want your users&apos; data. No IP addresses. No fingerprints. No cookie banners required. Pure, aggregated insights.
                 </p>
              </div>
            </div>

            {/* Abstract Decorative visual */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
               <Shield size={300} strokeWidth={0.5} />
            </div>
          </motion.div>

          {/* Card 2: Speed - Technical Spec Sheet Look */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-8 md:p-10 relative border border-neutral-200 bg-white hover:border-neutral-300 transition-colors group"
          >
             {/* Corner Markers */}
            <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-neutral-300"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-neutral-300"></div>

            <div className="flex flex-col h-full justify-between">
              <div className="w-12 h-12 border border-neutral-100 bg-surface flex items-center justify-center">
                <Zap size={20} className="text-ink" />
              </div>
              
              <div className="mt-8">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-mono font-bold tracking-tighter text-ink group-hover:text-pulse transition-colors">&lt;1</span>
                  <span className="text-xl font-mono text-neutral-400">KB</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Ultralight Script</h3>
                <p className="text-neutral-500 text-sm">
                  Lighter than a tweet. Doesn&apos;t block the main thread. 100% Lighthouse score.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Ownership - Database Look */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-8 md:p-10 relative border border-neutral-200 bg-white hover:border-neutral-300 transition-colors group"
          >
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-neutral-300"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-neutral-300"></div>

             <div className="flex flex-col h-full justify-between">
               <div className="w-12 h-12 border border-neutral-100 bg-surface flex items-center justify-center">
                 <Database size={20} className="text-ink" />
               </div>

               <div className="mt-8">
                 <h3 className="text-lg font-bold mb-2 group-hover:text-pulse transition-colors">Data Ownership</h3>
                 <p className="text-neutral-500 text-sm mb-4">
                   Your database. Your rules. Export to JSON/CSV anytime.
                 </p>
                 <div className="flex gap-2">
                    <span className="px-2 py-1 bg-surface border border-neutral-100 text-[10px] font-mono text-neutral-500">JSON</span>
                    <span className="px-2 py-1 bg-surface border border-neutral-100 text-[10px] font-mono text-neutral-500">CSV</span>
                    <span className="px-2 py-1 bg-surface border border-neutral-100 text-[10px] font-mono text-neutral-500">API</span>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Card 4: Real-time - Live Monitor Look */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-2 p-0 relative border border-neutral-200 bg-ink overflow-hidden group"
          >
             <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
             
             <div className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-4">
                   <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pulse"></span>
                   </span>
                   <span className="text-pulse font-mono text-xs uppercase tracking-widest">Live Pulse</span>
                 </div>
                 <h3 className="text-white text-2xl font-bold mb-2">Real-time Visualization</h3>
                 <p className="text-neutral-400 text-sm max-w-sm">
                   Watch traffic patterns unfold as they happen. Zero latency reporting for critical events.
                 </p>
               </div>

               {/* Live Counter Widget */}
               <div className="bg-[#111] border border-neutral-800 p-6 rounded-lg w-full md:w-auto min-w-[200px]">
                  <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Active Users</span>
                    <Activity size={14} className="text-pulse" />
                  </div>
                  <div className="text-5xl font-mono font-bold text-white tracking-tighter tabular-nums mb-2">
                    1,429
                  </div>
                  <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-pulse"
                      initial={{ width: "40%" }}
                      animate={{ width: ["40%", "45%", "35%", "50%", "40%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
               </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;
