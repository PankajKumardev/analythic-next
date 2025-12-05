'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: "Is it really GDPR compliant?",
    answer: "Yes. We do not use cookies, we do not store IP addresses, and we do not collect any personally identifiable information (PII). You do not need a cookie banner to use Analythic."
  },
  {
    question: "Can I self-host Analythic?",
    answer: "Absolutely. Analythic is open-source. You can grab the code from GitHub, spin up a Docker container, and host it on your own server for free."
  },
  {
    question: "Will it slow down my website?",
    answer: "No. Our tracking script is less than 1KB and is served via a global CDN. It loads asynchronously so it never blocks your page rendering."
  },
  {
    question: "Can I export my data?",
    answer: "Yes, you own your data. You can export your analytics data to CSV or JSON formats at any time directly from the dashboard."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-surface border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Frequently asked questions</h2>
        
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div 
              key={index} 
              className="border border-neutral-200 rounded-lg bg-white overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors"
              >
                <span className="font-semibold text-lg">{q.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus size={24} className={`transition-colors ${activeIndex === index ? 'text-pulse' : 'text-neutral-400'}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-neutral-500 leading-relaxed border-t border-neutral-100 mt-2">
                      {q.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
