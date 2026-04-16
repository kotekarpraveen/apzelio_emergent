import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Gauge, Database, ArrowUpRight, ArrowRight, Cloud, Terminal, Shield, Network, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/mock';
import { useThemeClasses } from '../hooks/useThemeClasses';
import ContactModal from '../components/ContactModal';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Portfolio = () => {
  const { hero, projects, techStack } = portfolioData;
  const t = useThemeClasses();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className={`pt-32 ${t.bgSurface}`}>
      <section className="max-w-7xl mx-auto px-8 mb-32 relative">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full md:w-3/5">
            <span className={`inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full ${t.secondaryContainer}`}>{hero.badge}</span>
            <h1 className={`text-5xl md:text-7xl font-headline font-bold leading-[1.1] tracking-[-0.04em] mb-8 ${t.textOnSurface}`}>
              {hero.title} <span className={`italic ${t.textPrimary}`}>{hero.titleHighlight}</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-xl leading-relaxed mb-10 ${t.textOnSurfaceVariant}`}>{hero.description}</p>
            <div className="flex flex-wrap gap-4">
              {hero.stats.map((stat, i) => {
                const Icon = stat.icon === 'Cpu' ? Cpu : Gauge;
                return (
                  <div key={i} className={`flex items-center gap-3 px-6 py-4 rounded-xl border ${t.glassPanel} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
                    <Icon className={`w-8 h-8 ${i === 0 ? t.textPrimary : t.textTertiary}`} />
                    <div>
                      <p className={`text-xs uppercase tracking-widest ${t.textOnSurfaceVariant}`}>{stat.label}</p>
                      <p className={`text-xl font-headline font-bold ${t.textOnSurface}`}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }} className="w-full md:w-2/5 relative">
            <div className={`absolute -inset-4 blur-[100px] rounded-full ${t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/5'}`} />
            <img alt="Abstract architecture" className={`rounded-2xl border shadow-2xl relative z-10 w-full ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`} src={hero.image} />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mb-40">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-between items-end mb-16">
          <div>
            <h2 className={`text-3xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Selected Deployments</h2>
            <p className={`max-w-md ${t.textOnSurfaceVariant}`}>Deep dives into high-stakes engineering projects where performance was the only metric that mattered.</p>
          </div>
          <div className="hidden md:block">
            <button className={`flex items-center gap-2 font-bold hover:gap-4 transition-all ${t.textPrimary}`}>View All Archives <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`md:col-span-8 rounded-2xl overflow-hidden group border ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-10 flex flex-col justify-between w-full md:w-1/2">
                <div>
                  <div className="flex gap-2 mb-6">
                    {projects[0].tags.map(tag => (<span key={tag} className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${tag === 'AI Platform' ? t.secondaryContainer : (t.bgSurfaceHighest + ' ' + t.textPrimary)}`}>{tag}</span>))}
                  </div>
                  <h3 className={`text-3xl font-headline font-bold mb-4 transition-colors ${t.textOnSurface} group-hover:${t.isDark ? 'text-[#47d6ff]' : 'text-[#006398]'}`}>{projects[0].title}</h3>
                  <p className={`mb-8 leading-relaxed ${t.textOnSurfaceVariant}`}>{projects[0].description}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`text-4xl font-headline font-bold ${t.textPrimary}`}>{projects[0].metric.value}</span>
                    <span className={`text-sm uppercase tracking-tighter leading-none ${t.textOnSurfaceVariant}`}>End-to-end<br />latency</span>
                  </div>
                  <button className={`inline-flex items-center gap-2 font-bold group/link ${t.textPrimary}`}>Read Analysis <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" /></button>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img alt="Dashboard" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src={projects[0].image} />
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className={`md:col-span-4 rounded-2xl p-8 flex flex-col justify-between border ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200'}`}>
            <div>
              <div className={`mb-6 h-12 w-12 rounded-lg flex items-center justify-center ${t.tertiaryContainer}`}><Database className="w-5 h-5" /></div>
              <h3 className={`text-2xl font-headline font-bold mb-3 ${t.textOnSurface}`}>{projects[1].title}</h3>
              <p className={`mb-6 text-sm ${t.textOnSurfaceVariant}`}>{projects[1].description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {projects[1].techTags.map(tag => (<span key={tag} className={`text-[10px] px-2 py-1 rounded uppercase ${t.bgSurfaceHighest} ${t.textOnSurfaceVariant}`}>{tag}</span>))}
              </div>
            </div>
            <div className={`border-t pt-6 ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
              <p className={`text-3xl font-headline font-bold ${t.textOnSurface}`}>{projects[1].metric.value} <span className={`text-sm font-body uppercase tracking-widest ${t.textOnSurfaceVariant}`}>{projects[1].metric.label}</span></p>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className={`md:col-span-5 rounded-2xl overflow-hidden border group ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200'}`}>
            <img alt="Global connectivity" className="w-full h-48 object-cover opacity-50 group-hover:opacity-80 transition-opacity" src={projects[2].image} />
            <div className="p-8">
              <h3 className={`text-2xl font-headline font-bold mb-3 ${t.textOnSurface}`}>{projects[2].title}</h3>
              <p className={`text-sm mb-6 ${t.textOnSurfaceVariant}`}>{projects[2].description}</p>
              <div className="flex items-center gap-6">
                {projects[2].stats.map((stat, i) => (<div key={i} className="text-center"><p className={`text-xl font-headline font-bold ${t.textPrimary}`}>{stat.value}</p><p className={`text-[10px] uppercase ${t.textOnSurfaceVariant}`}>{stat.label}</p></div>))}
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className={`md:col-span-7 rounded-2xl p-10 relative overflow-hidden flex flex-col justify-center border ${t.bgSurfaceHigh} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
            <div className={`absolute right-0 top-0 h-full w-1/3 pointer-events-none ${t.isDark ? 'bg-gradient-to-l from-[#47d6ff]/5 to-transparent' : 'bg-gradient-to-l from-[#006398]/5 to-transparent'}`} />
            <div className="max-w-md relative z-10">
              <span className={`text-xs font-bold uppercase tracking-widest mb-4 block ${t.textPrimary}`}>{projects[3].badge}</span>
              <h3 className={`text-3xl font-headline font-bold mb-4 ${t.textOnSurface}`}>{projects[3].title}</h3>
              <p className={`leading-relaxed mb-8 ${t.textOnSurfaceVariant}`}>{projects[3].description}</p>
              <button className={`px-6 py-3 rounded-lg text-sm font-bold border transition-colors ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/20 hover:bg-[#31394d] text-[#dae2fd]' : 'border-gray-200 hover:bg-[#e6e8ea] text-[#191c1e]'}`}>Technical Whitepaper</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-32 mb-40 ${t.bgSurfaceLow}`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className={`text-4xl font-headline font-bold mb-8 ${t.textOnSurface}`}>The Hard <span className={t.textPrimary}>Tech.</span></h2>
              <p className={`text-lg mb-12 max-w-lg leading-relaxed ${t.textOnSurfaceVariant}`}>We don't just "use" technology; we contribute to it.</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2"><h4 className={`font-headline font-bold ${t.textOnSurface}`}>Language Core</h4><ul className={`space-y-1 text-sm ${t.textOnSurfaceVariant}`}>{techStack.languages.map(l => <li key={l}>{l}</li>)}</ul></div>
                <div className="space-y-2"><h4 className={`font-headline font-bold ${t.textOnSurface}`}>Cloud Ops</h4><ul className={`space-y-1 text-sm ${t.textOnSurfaceVariant}`}>{techStack.cloudOps.map(l => <li key={l}>{l}</li>)}</ul></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-3 gap-4">
              {[Cloud, Terminal, Shield, Network, Database, Cpu].map((Icon, i) => (
                <div key={i} className={`aspect-square rounded-xl flex items-center justify-center border ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
                  <Icon className={`w-10 h-10 opacity-40 ${t.textPrimary}`} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-8 mb-40 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`p-16 rounded-[2rem] border relative overflow-hidden ${t.isDark ? 'bg-gradient-to-br from-[#222a3d] to-[#131b2e] border-[#45464d]/20' : 'bg-gradient-to-br from-[#e6e8ea] to-[#f2f4f6] border-gray-200'}`}>
          <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles className="w-40 h-40" /></div>
          <h2 className={`text-4xl md:text-5xl font-headline font-bold mb-6 ${t.textOnSurface}`}>Ready to scale the <span className={t.textPrimary}>Ether?</span></h2>
          <p className={`max-w-2xl mx-auto mb-10 text-lg ${t.textOnSurfaceVariant}`}>Whether you need a legacy migration or a ground-up AI platform architecture, we bring the surgical precision required for modern scale.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button onClick={() => setContactOpen(true)} className={`px-10 py-4 rounded-xl font-bold text-lg transition-all ${t.ctaGradient}`} style={t.ctaShadow}>Schedule an Architect Call</button>
            <button onClick={() => window.location.href='/methodology'} className={`px-10 py-4 rounded-xl font-bold text-lg border transition-all ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/30 hover:border-[#47d6ff]/50 text-[#dae2fd]' : 'border-gray-200 hover:border-[#006398]/50 text-[#191c1e]'}`}>Review Technical Process</button>
          </div>
        </motion.div>
      </section>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Portfolio;
