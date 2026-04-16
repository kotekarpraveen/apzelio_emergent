import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Cloud, BrainCircuit, Code2, Database, Layers, Shield, Activity, BadgeCheck, Zap, Terminal, Plug, Cpu } from 'lucide-react';
import { techStackPageData } from '../data/mock';
import { useThemeClasses } from '../hooks/useThemeClasses';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const TechStack = () => {
  const { hero, techGrid, reliability, standards } = techStackPageData;
  const t = useThemeClasses();

  return (
    <main className={`pt-32 pb-20 ${t.bgSurface}`}>
      <section className="max-w-7xl mx-auto px-8 mb-24 relative">
        <div className={`absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none ${t.isDark ? 'bg-[#d2bbff]/10' : 'bg-[#40a2e7]/10'}`} />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl relative z-10">
          <span className={`uppercase tracking-[0.08em] font-bold mb-4 block text-sm ${t.textPrimary}`}>{hero.label}</span>
          <h1 className={`text-6xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tighter mb-8 ${t.textOnSurface}`}>
            {hero.title} <span className={t.textGradient}>{hero.titleHighlight}</span>
          </h1>
          <p className={`text-lg leading-relaxed max-w-2xl ${t.textOnSurfaceVariant}`}>{hero.description}</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`md:col-span-8 rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group ${t.bgSurfaceLow}`}>
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity"><Terminal className="w-36 h-36" /></div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${t.isDark ? 'bg-[#47d6ff]/20' : 'bg-[#006398]/10'}`}><Gauge className={`w-5 h-5 ${t.textPrimary}`} /></div>
              <h3 className={`text-2xl font-headline font-bold ${t.textOnSurface}`}>Go (Golang)</h3>
            </div>
            <h4 className={`text-4xl font-headline font-medium mb-6 leading-tight ${t.textOnSurface}`}>High-Concurrency Backend Systems</h4>
            <p className={`text-lg max-w-xl ${t.textOnSurfaceVariant}`}>{techGrid[0].description}</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {techGrid[0].tags.map(tag => (<span key={tag} className={`px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${t.secondaryContainer}`}>{tag}</span>))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className={`md:col-span-4 rounded-xl p-8 relative overflow-hidden group ${t.bgSurfaceHighest}`}>
          <div className="h-full flex flex-col">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-8 ${t.isDark ? 'bg-[#d2bbff]/20' : 'bg-[#00668a]/10'}`}><Cloud className={`w-5 h-5 ${t.textTertiary}`} /></div>
            <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>AWS</h3>
            <p className={`mb-8 flex-grow ${t.textOnSurfaceVariant}`}>{techGrid[1].description}</p>
            <div className="space-y-4">
              {techGrid[1].stats.map((stat, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${t.isDark ? 'bg-[#0b1326]/50 border-[#45464d]/10' : 'bg-white/50 border-gray-200'}`}>
                  <span className={`text-sm font-medium ${t.textOnSurface}`}>{stat}</span>
                  {i === 0 ? <BadgeCheck className={`w-4 h-4 ${t.textPrimary}`} /> : <Zap className={`w-4 h-4 ${t.textPrimary}`} />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className={`md:col-span-4 rounded-xl p-8 border ${t.bgSurfaceContainer} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200/50'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${t.isDark ? 'bg-[#965fff]/20' : 'bg-[#006398]/10'}`}><BrainCircuit className={`w-5 h-5 ${t.isDark ? 'text-[#965fff]' : 'text-[#006398]'}`} /></div>
          <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Python & AI</h3>
          <p className={`text-sm leading-relaxed mb-6 ${t.textOnSurfaceVariant}`}>{techGrid[2].description}</p>
          <div className="grid grid-cols-2 gap-2">
            {techGrid[2].subTags.map(tag => (<div key={tag} className={`p-2 rounded text-[10px] font-bold uppercase text-center ${t.bgSurfaceHigh} ${t.textOnSurface}`}>{tag}</div>))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className={`md:col-span-5 rounded-xl p-8 flex flex-col justify-between overflow-hidden relative ${t.bgSurfaceLow}`}>
          <div className="relative z-10">
            <div className="flex gap-4 mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/10'}`}><Code2 className={`w-5 h-5 ${t.textPrimary}`} /></div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/10'}`}><Plug className={`w-5 h-5 ${t.textPrimary}`} /></div>
            </div>
            <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Node.js & React</h3>
            <p className={t.textOnSurfaceVariant}>{techGrid[3].description}</p>
          </div>
          <div className="mt-8 flex items-baseline gap-2">
            <span className={`text-4xl font-headline font-bold ${t.textPrimary}`}>0.1s</span>
            <span className={`text-xs uppercase tracking-widest ${t.textOnSurfaceVariant}`}>Response Time Goal</span>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className={`md:col-span-3 rounded-xl p-8 ${t.isDark ? 'bg-gradient-to-br from-[#222a3d] to-[#2d3449]' : 'bg-gradient-to-br from-[#e6e8ea] to-[#e0e3e5]'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${t.isDark ? 'bg-[#ffb4ab]/10' : 'bg-red-50'}`}><Database className={`w-5 h-5 ${t.errorColor}`} /></div>
          <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Redis</h3>
          <p className={`text-sm ${t.textOnSurfaceVariant}`}>{techGrid[4].description}</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-24">
        <div className={`rounded-2xl p-8 md:p-12 overflow-hidden relative ${t.bgSurfaceLow}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className={`text-4xl font-headline font-bold mb-6 ${t.textOnSurface}`}>{reliability.title} <span className={t.textPrimary}>{reliability.titleHighlight}</span></h2>
              <p className={`mb-8 text-lg ${t.textOnSurfaceVariant}`}>{reliability.description}</p>
              <div className="space-y-6">
                {reliability.features.map((f, i) => {
                  const icons = { Layers, Shield, Activity };
                  const Icon = icons[f.icon] || Layers;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className={`mt-1 ${t.textPrimary}`}><Icon className="w-5 h-5" /></div>
                      <div>
                        <h4 className={`font-bold text-lg mb-1 ${t.textOnSurface}`}>{f.title}</h4>
                        <p className={`text-sm ${t.textOnSurfaceVariant}`}>{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative group">
              <div className={`absolute -inset-4 blur-2xl opacity-50 ${t.isDark ? 'bg-gradient-to-tr from-[#47d6ff]/20 to-[#d2bbff]/20' : 'bg-gradient-to-tr from-[#006398]/10 to-[#40a2e7]/10'}`} />
              <img alt="Server infrastructure" className="rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 relative z-10 w-full" src={reliability.image} />
              <div className={`absolute bottom-6 left-6 right-6 backdrop-blur-md p-6 rounded-lg z-20 border ${t.isDark ? 'bg-[#0b1326]/80 border-[#45464d]/10' : 'bg-white/80 border-gray-200'}`}>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${t.isDark ? 'bg-[#47d6ff] text-[#003543]' : 'bg-[#006398] text-white'}`}>CI</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${t.isDark ? 'bg-[#d2bbff] text-[#3f008e]' : 'bg-[#00668a] text-white'}`}>CD</div>
                  </div>
                  <div className={`text-sm font-bold uppercase tracking-widest ${t.textOnSurface}`}>Automated Pipeline Active</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-32 text-center mb-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`text-4xl font-headline font-bold mb-16 ${t.textOnSurface}`}>The ApZelio Engineering Standard</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {standards.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`p-8 border-l-2 ${t.isDark ? 'border-[#47d6ff]/20 bg-[#060e20]/50' : 'border-[#006398]/20 bg-white/50'}`}>
              <h4 className={`text-xl font-headline font-bold mb-4 ${t.textOnSurface}`}>{s.title}</h4>
              <p className={`text-sm leading-relaxed ${t.textOnSurfaceVariant}`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TechStack;
