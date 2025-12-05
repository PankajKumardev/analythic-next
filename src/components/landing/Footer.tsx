import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div>
          <div className="flex items-center gap-1 mb-4">
            <Link href="/" className="font-bold text-xl tracking-tighter">ANALYTHIC</Link>
            <div className="w-1.5 h-1.5 rounded-full bg-pulse"></div>
          </div>
          <p className="text-neutral-500 text-sm max-w-xs">
            Open-source analytics for developers who care about privacy, performance, and ownership.
          </p>
        </div>

        <div className="flex gap-12">
            <div>
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
                <ul className="space-y-3 text-sm text-neutral-500">
                    <li><Link href="#features" className="hover:text-pulse transition-colors">Features</Link></li>
                    <li><Link href="#integration" className="hover:text-pulse transition-colors">Integration</Link></li>
                    <li><Link href="#pricing" className="hover:text-pulse transition-colors">Pricing</Link></li>
                    <li><Link href="#" className="hover:text-pulse transition-colors">Changelog</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Community</h4>
                <ul className="space-y-3 text-sm text-neutral-500">
                    <li><Link href="https://github.com/PankajKumardev/analythic-next" target="_blank" className="hover:text-pulse transition-colors">GitHub</Link></li>
                    <li><Link href="#" className="hover:text-pulse transition-colors">Twitter</Link></li>
                    <li><Link href="#" className="hover:text-pulse transition-colors">Discord</Link></li>
                </ul>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Analythic. Open Source MIT License.
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-neutral-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-neutral-600">All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
