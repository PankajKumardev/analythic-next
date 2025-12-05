'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                Stop feeding the <br />
                <span className="text-pulse">data giants.</span>
            </h2>
            
            <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                Join the open web. Get lightweight, privacy-friendly analytics set up in less than 2 minutes.
            </p>

            <button className="h-14 px-10 rounded-full bg-white text-ink font-bold text-lg hover:bg-neutral-200 transition-all flex items-center gap-2 mx-auto group">
                Start for Free
                <ArrowRight size={20} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-ink transition-all" />
            </button>
            
            <p className="mt-8 text-sm text-neutral-600 font-mono">
                Open Source • No Credit Card • Cancel Anytime
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
