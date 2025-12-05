import React from 'react';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const OpenSource = () => {
  return (
    <section className="bg-ink text-white py-24 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pulse opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Fork it. Host it. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">Own it.</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-lg">
            Analythic is completely open source. Inspect the code, contribute to the roadmap, or self-host it on your own infrastructure for total control.
          </p>
          <div className="flex gap-4">
            <Link
              href={"https://github.com/PankajKumardev/analythic-next"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-ink font-bold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              <Github size={20} /> View Repo
            </Link>
            <Link 
              href="#"
              className="px-6 py-3 border border-neutral-700 text-white font-bold rounded-lg hover:border-white transition-colors flex items-center gap-2"
            >
              Read Docs
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
           <Link 
             href="https://github.com/PankajKumardev/analythic-next"
             target="_blank"
             rel="noopener noreferrer"
             className="block group"
           >
            <div className="bg-[#0A0A0A] border border-neutral-800 rounded-xl p-6 hover:border-neutral-600 transition-all shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                            <Github size={24} className="text-white" />
                        </div>
                        <div>
                            <div className="font-semibold text-white group-hover:text-pulse transition-colors">PankajKumardev/analythic-next</div>
                            <div className="text-xs text-neutral-500">Public</div>
                        </div>
                    </div>
                    <ExternalLink size={18} className="text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <p className="text-neutral-400 text-sm mb-6 line-clamp-2">
                    Open source web analytics. Privacy-first, lightweight, and cookie-free. The alternative to Google Analytics you&apos;ve been looking for.
                </p>
                <div className="flex items-center gap-6 text-sm text-neutral-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span>TypeScript</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Star size={16} />
                        <span>1.2k</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <GitFork size={16} />
                        <span>142</span>
                    </div>
                </div>
            </div>
           </Link>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
