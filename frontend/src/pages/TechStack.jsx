import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Cloud, BrainCircuit, Code2, Database, Layers, Shield, Activity, BadgeCheck, Zap, Terminal, Plug, Cpu } from 'lucide-react';
import { techStackPageData } from '../data/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const TechStack = () => {
  const { hero, techGrid, reliability, standards } = techStackPageData;

  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 mb-24 relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-ap-tertiary/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl relative z-10">
          <span className="uppercase tracking-[0.08em] text-ap-primary font-bold mb-4 block text-sm">{hero.label}</span>
          <h1 className="text-6xl md:text-7xl font-headline font-bold text-ap-on-surface leading-[1.1] tracking-tighter mb-8">
            {hero.title} <span className="text-gradient-purple">{hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-ap-on-surface-variant leading-relaxed max-w-2xl">{hero.description}</p>
        </motion.div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Go - Large */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-8 bg-ap-surface-container-low rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Terminal className="w-36 h-36" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-ap-primary/20 rounded-lg flex items-center justify-center">
                <Gauge className="w-5 h-5 text-ap-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold text-ap-on-surface">Go (Golang)</h3>
            </div>
            <h4 className="text-4xl font-headline font-medium mb-6 text-ap-on-surface leading-tight">High-Concurrency Backend Systems</h4>
            <p className="text-ap-on-surface-variant text-lg max-w-xl">{techGrid[0].description}</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {techGrid[0].tags.map((tag) => (
              <span key={tag} className="bg-ap-secondary-container text-ap-on-secondary-container px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* AWS - Small */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="md:col-span-4 bg-ap-surface-container-highest rounded-xl p-8 relative overflow-hidden group">
          <div className="h-full flex flex-col">
            <div className="w-12 h-12 bg-ap-tertiary/20 rounded-lg flex items-center justify-center mb-8">
              <Cloud className="w-5 h-5 text-ap-tertiary" />
            </div>
            <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">AWS</h3>
            <p className="text-ap-on-surface-variant mb-8 flex-grow">{techGrid[1].description}</p>
            <div className="space-y-4">
              {techGrid[1].stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-ap-surface/50 rounded-lg border border-ap-outline-variant/10">
                  <span className="text-sm font-medium text-ap-on-surface">{stat}</span>
                  {i === 0 ? <BadgeCheck className="w-4 h-4 text-ap-primary" /> : <Zap className="w-4 h-4 text-ap-primary" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Python & AI */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="md:col-span-4 bg-ap-surface-container rounded-xl p-8 border border-ap-outline-variant/5">
          <div className="w-12 h-12 bg-ap-on-tertiary-container/20 rounded-lg flex items-center justify-center mb-6">
            <BrainCircuit className="w-5 h-5 text-ap-on-tertiary-container" />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Python & AI</h3>
          <p className="text-ap-on-surface-variant text-sm leading-relaxed mb-6">{techGrid[2].description}</p>
          <div className="grid grid-cols-2 gap-2">
            {techGrid[2].subTags.map((tag) => (
              <div key={tag} className="p-2 bg-ap-surface-container-high rounded text-[10px] font-bold uppercase text-center text-ap-on-surface">{tag}</div>
            ))}
          </div>
        </motion.div>

        {/* Node.js & React */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-5 bg-ap-surface-container-low rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-ap-primary/10 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-ap-primary" />
              </div>
              <div className="w-10 h-10 bg-ap-primary/10 rounded-lg flex items-center justify-center">
                <Plug className="w-5 h-5 text-ap-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Node.js & React</h3>
            <p className="text-ap-on-surface-variant">{techGrid[3].description}</p>
          </div>
          <div className="mt-8 flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-ap-primary">0.1s</span>
            <span className="text-xs uppercase tracking-widest text-ap-on-surface-variant">Response Time Goal</span>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ap-primary/5 blur-3xl rounded-full" />
        </motion.div>

        {/* Redis */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="md:col-span-3 bg-gradient-to-br from-ap-surface-container-high to-ap-surface-container-highest rounded-xl p-8">
          <div className="w-12 h-12 bg-ap-error/10 rounded-lg flex items-center justify-center mb-6">
            <Database className="w-5 h-5 text-ap-error" />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Redis</h3>
          <p className="text-ap-on-surface-variant text-sm">{techGrid[4].description}</p>
        </motion.div>
      </section>

      {/* Reliability Section */}
      <section className="max-w-7xl mx-auto px-8 mt-24">
        <div className="bg-ap-surface-container-low rounded-2xl p-8 md:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl font-headline font-bold mb-6 text-ap-on-surface">
                {reliability.title} <span className="text-ap-primary">{reliability.titleHighlight}</span>
              </h2>
              <p className="text-ap-on-surface-variant mb-8 text-lg">{reliability.description}</p>
              <div className="space-y-6">
                {reliability.features.map((f, i) => {
                  const icons = { Layers, Shield, Activity };
                  const Icon = icons[f.icon] || Layers;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="text-ap-primary mt-1"><Icon className="w-5 h-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-ap-on-surface">{f.title}</h4>
                        <p className="text-ap-on-surface-variant text-sm">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-ap-primary/20 to-ap-tertiary/20 blur-2xl opacity-50" />
              <img
                alt="Server infrastructure"
                className="rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 relative z-10 w-full"
                src={reliability.image}
              />
              <div className="absolute bottom-6 left-6 right-6 bg-ap-surface/80 backdrop-blur-md p-6 rounded-lg z-20 border border-ap-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-ap-primary flex items-center justify-center text-xs font-bold text-ap-on-primary">CI</div>
                    <div className="w-10 h-10 rounded-full bg-ap-tertiary flex items-center justify-center text-xs font-bold text-ap-on-tertiary">CD</div>
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-ap-on-surface">Automated Pipeline Active</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engineering Standards */}
      <section className="max-w-7xl mx-auto px-8 mt-32 text-center">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl font-headline font-bold mb-16 text-ap-on-surface">
          The ApZelio Engineering Standard
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {standards.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="p-8 border-l-2 border-ap-primary/20 bg-ap-surface-container-lowest/50">
              <h4 className="text-xl font-headline font-bold mb-4 text-ap-on-surface">{s.title}</h4>
              <p className="text-ap-on-surface-variant text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TechStack;
