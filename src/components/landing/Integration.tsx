'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Integration = () => {
  const [copied, setCopied] = useState(false);
  const codeSnippet = `<script src="https://analythic.com/tracker.js" data-id="your-id"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="integration" className="py-24 px-6 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border mb-6 shadow-sm">
            <Terminal size={14} className="text-pulse" />
            <span className="text-xs font-mono font-medium text-subtle">Dev Experience</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Drop in a single <br />
            line of code.
          </h2>
          <p className="text-subtle text-lg mb-8">
            Works with Next.js, React, Vue, Svelte, or plain HTML. No complex setup. No heavy dependencies.
          </p>
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-pulse/10 flex items-center justify-center text-pulse text-xs font-bold">1</div>
               <p className="font-medium">Sign up and get your Project ID</p>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-pulse/10 flex items-center justify-center text-pulse text-xs font-bold">2</div>
               <p className="font-medium">Add the script to your {`<head>`}</p>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-pulse/10 flex items-center justify-center text-pulse text-xs font-bold">3</div>
               <p className="font-medium">See live data instantly</p>
             </div>
          </div>
        </div>

        {/* Right Code Block */}
        <div className="flex-1 w-full">
          <motion.div 
            className="bg-[#050505] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-subtle font-mono">layout.tsx</span>
            </div>
            <div className="p-6 overflow-x-auto relative group">
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
              
              <pre className="font-mono text-sm leading-relaxed text-neutral-300">
                <code>
                  <span className="text-purple-400">import</span> Script <span className="text-purple-400">from</span> <span className="text-green-400">&apos;next/script&apos;</span>;
                  {'\n\n'}
                  <span className="text-purple-400">export default function</span> <span className="text-blue-400">RootLayout</span>({'{'} children {'}'}) {'{'}
                  {'\n'}  <span className="text-purple-400">return</span> (
                  {'\n'}    <span className="text-subtle">&lt;</span><span className="text-red-400">html</span> <span className="text-yellow-400">lang</span>=<span className="text-green-400">&quot;en&quot;</span><span className="text-subtle">&gt;</span>
                  {'\n'}      <span className="text-subtle">&lt;</span><span className="text-red-400">body</span><span className="text-subtle">&gt;</span>
                  {'\n'}        {'{'}children{'}'}
                  {'\n'}        <span className="text-subtle">&lt;</span><span className="text-yellow-400">Script</span> 
                  {'\n'}          <span className="text-yellow-400">src</span>=<span className="text-green-400">&quot;https://analythic.com/tracker.js&quot;</span>
                  {'\n'}          <span className="text-yellow-400">data-website-id</span>=<span className="text-green-400">&quot;...&quot;</span> 
                  {'\n'}        <span className="text-subtle">/&gt;</span>
                  {'\n'}      <span className="text-subtle">&lt;/</span><span className="text-red-400">body</span><span className="text-subtle">&gt;</span>
                  {'\n'}    <span className="text-subtle">&lt;/</span><span className="text-red-400">html</span><span className="text-subtle">&gt;</span>
                  {'\n'}  );
                  {'\n'}{'}'}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Integration;


