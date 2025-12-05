'use client';

import React from 'react';
import Link from 'next/link';
import { Github, ArrowRight, TrendingUp, Users, Globe } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', uv: 400 },
  { name: 'Tue', uv: 300 },
  { name: 'Wed', uv: 550 },
  { name: 'Thu', uv: 480 },
  { name: 'Fri', uv: 700 },
  { name: 'Sat', uv: 600 },
  { name: 'Sun', uv: 900 },
];

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-radial opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-subtle mb-8 hover:border-pulse/30 transition-colors cursor-default"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse" />
          Open Source v1.0
          <span className="text-subtle">•</span>
          <Link href="https://github.com/PankajKumardev/analythic-next" target="_blank" className="hover:text-foreground hover:underline">GitHub</Link>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]"
        >
          Analytics without the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-red-gradient">creepy tracking</span>.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-subtle max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Less than 1KB. No cookies. GDPR Compliant. <br className="hidden sm:block" />
          The open-source alternative to Google Analytics.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button className="h-12 px-8 rounded-full bg-pulse text-white font-medium hover:bg-[#d90034] transition-all hover:shadow-soft-red hover:-translate-y-0.5 active:translate-y-0">
            Start Free
          </button>
          <Link 
            href="https://github.com/PankajKumardev/analythic-next" 
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-8 rounded-full bg-background border border-border text-foreground font-medium hover:border-foreground transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </Link>
        </motion.div>

        {/* Dashboard Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-pulse blur-[100px] opacity-10" />
          <div className="relative bg-background rounded-2xl border border-border shadow-2xl overflow-hidden p-2 md:p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Main Chart */}
            <div className="md:col-span-2 bg-surface rounded-xl p-6 border border-border flex flex-col h-[300px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-medium text-subtle">Total Visitors</h3>
                  <p className="text-2xl font-bold font-mono mt-1">124,592</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-background rounded text-xs font-medium border border-border text-foreground">30d</span>
                </div>
              </div>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff003d" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#ff003d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{ stroke: '#e5e5e5' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="uv" 
                      stroke="#ff003d" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorUv)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Side Stats */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 bg-surface rounded-xl p-5 border border-border hover:border-border transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-background rounded-lg shadow-sm">
                    <TrendingUp className="w-4 h-4 text-pulse" />
                  </div>
                  <span className="text-sm font-medium text-subtle">Bounce Rate</span>
                </div>
                <p className="text-2xl font-bold font-mono">12.5%</p>
                <div className="mt-2 text-xs text-green-600 font-medium flex items-center">
                  ↓ 2.1% <span className="text-subtle font-normal ml-1">vs last week</span>
                </div>
              </div>

              <div className="flex-1 bg-surface rounded-xl p-5 border border-border hover:border-border transition-colors">
                <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-background rounded-lg shadow-sm">
                    <Globe className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-sm font-medium text-subtle">Top Source</span>
                </div>
                <p className="text-lg font-bold font-mono truncate">twitter.com</p>
                <div className="mt-2 w-full bg-border rounded-full h-1.5 overflow-hidden">
                  <div className="bg-foreground h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

               <div className="flex-1 bg-surface rounded-xl p-5 border border-border hover:border-border transition-colors">
                <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-background rounded-lg shadow-sm">
                    <Users className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-sm font-medium text-subtle">Live Now</span>
                </div>
                <p className="text-2xl font-bold font-mono text-pulse flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pulse animate-pulse"></span>
                  42
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


