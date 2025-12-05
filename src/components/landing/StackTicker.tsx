import React from 'react';

const technologies = [
  "Next.js",
  "Prisma",
  "PostgreSQL",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Vercel",
  "React",
  "Node.js"
];

const StackTicker = () => {
  return (
    <section className="py-12 border-y border-neutral-100 bg-surface overflow-hidden">
        <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase text-neutral-400 tracking-widest">Powered by modern infrastructure</span>
        </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {technologies.concat(technologies).map((tech, index) => (
            <span
              key={index}
              className="mx-8 text-2xl font-bold text-neutral-300 hover:text-pulse transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {technologies.concat(technologies).map((tech, index) => (
            <span
              key={`duplicate-${index}`}
              className="mx-8 text-2xl font-bold text-neutral-300 hover:text-pulse transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackTicker;
