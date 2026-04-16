import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Database, Rocket, Network, Building2, CheckCircle, Check, Headphones, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/mock';
import { useThemeClasses } from '../hooks/useThemeClasses';
import ContactModal from '../components/ContactModal';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Services = () => {
  const { hero, aiDriven, tiers, support } = servicesData;
  const t = useThemeClasses();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="pt-24">
      <section className={`relative px-8 py-24 overflow-hidden ${t.bgSurface}`}>
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 ${t.isDark ? 'bg-[#d2bbff]/10' : 'bg-[#40a2e7]/10'}`} />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-7xl mx-auto">
          <span className={`uppercase tracking-widest font-body text-sm mb-4 block font-bold ${t.textPrimary}`}>{hero.label}</span>
          <h1 className={`text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-tight max-w-4xl mb-8 ${t.textOnSurface}`}>
            {hero.title} <span className={t.textGradient}>{hero.titleHighlight}</span> {hero.titleEnd}
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl font-light leading-relaxed ${t.textOnSurfaceVariant}`}>{hero.description}</p>
        </motion.div>
      </section>

      <section className={`px-8 py-20 ${t.bgSurfaceLow}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7">
              <div className={`p-8 md:p-12 rounded-xl border relative overflow-hidden group ${t.glassCard} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
                <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl transition-all ${t.isDark ? 'bg-[#47d6ff]/5 group-hover:bg-[#47d6ff]/10' : 'bg-[#006398]/5 group-hover:bg-[#006398]/10'}`} />
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 ${t.tertiaryContainer}`}>
                  <Sparkles className="w-3 h-3" /> {aiDriven.badge}
                </span>
                <h2 className={`text-3xl md:text-5xl font-headline font-bold mb-6 ${t.textOnSurface}`}>{aiDriven.title}</h2>
                <p className={`text-lg mb-8 leading-relaxed ${t.textOnSurfaceVariant}`}>{aiDriven.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiDriven.features.map((f, i) => {
                    const Icon = f.icon === 'Brain' ? Brain : Database;
                    return (
                      <div key={i} className="flex gap-4">
                        <Icon className={`w-5 h-5 mt-1 shrink-0 ${t.textPrimary}`} />
                        <div>
                          <h4 className={`font-bold ${t.textOnSurface}`}>{f.title}</h4>
                          <p className={`text-sm ${t.textOnSurfaceVariant}`}>{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-5">
              <img alt="AI Visualization" className="rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-square w-full" src={aiDriven.image} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`px-8 py-24 ${t.bgSurface}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className={`text-4xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Scalable Engineering Tiers</h2>
            <p className={t.textOnSurfaceVariant}>Precision-crafted solutions for every stage of the business lifecycle.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`md:col-span-1 border p-8 rounded-xl flex flex-col h-full transition-colors ${t.bgSurfaceContainer} ${t.isDark ? 'border-[#45464d]/10 hover:bg-[#31394d]' : 'border-gray-200 hover:bg-[#e6e8ea]'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${t.secondaryContainer}`}><Rocket className="w-5 h-5" /></div>
              <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Rapid MVP & Growth</h3>
              <p className={`mb-8 ${t.textOnSurfaceVariant}`}>{tiers[0].description}</p>
              <ul className="space-y-3 mt-auto">
                {tiers[0].features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${t.textOnSurface}`}><CheckCircle className={`w-4 h-4 ${t.textPrimary}`} fill="currentColor" />{f}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className={`md:col-span-2 border p-8 rounded-xl flex flex-col md:flex-row gap-8 relative overflow-hidden ${t.bgSurfaceHigh} ${t.isDark ? 'border-[#47d6ff]/20' : 'border-[#006398]/20'}`}>
              <div className="absolute top-0 right-0 p-4">
                <span className={`font-bold px-3 py-1 rounded text-xs ${t.isDark ? 'text-[#47d6ff] bg-[#47d6ff]/10' : 'text-[#006398] bg-[#006398]/10'}`}>MOST POPULAR</span>
              </div>
              <div className="flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${t.primaryContainer}`}><Network className={`w-5 h-5 ${t.textPrimary}`} /></div>
                <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Scale-Up Infrastructure</h3>
                <p className={`mb-8 ${t.textOnSurfaceVariant}`}>{tiers[1].description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {tiers[1].subFeatures.map((f, i) => (
                    <div key={i} className={`p-4 rounded-lg ${t.surfaceVariant}`}>
                      <h5 className={`font-bold text-sm mb-1 ${t.textOnSurface}`}>{f.title}</h5>
                      <p className={`text-xs ${t.textOnSurfaceVariant}`}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-1/3"><img alt="Infrastructure" className="w-full h-full object-cover rounded-lg grayscale opacity-50" src={tiers[1].image} /></div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className={`md:col-span-3 p-10 rounded-xl flex flex-col md:flex-row items-center gap-12 group ${t.bgSurfaceHighest} ${t.isDark ? '' : 'border border-gray-200/50'}`}>
              <div className="flex-1 text-center md:text-left">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 ${t.tertiaryContainer}`}><Building2 className="w-8 h-8" /></div>
                <h3 className={`text-3xl font-headline font-bold mb-4 ${t.textOnSurface}`}>{tiers[2].title}</h3>
                <p className={`text-lg max-w-2xl ${t.textOnSurfaceVariant}`}>{tiers[2].description}</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-end max-w-sm">
                {tiers[2].tags.map(tag => (
                  <span key={tag} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border ${t.isDark ? 'bg-[#31394d] border-[#45464d]/30 text-[#dae2fd]' : 'bg-[#f7f9fb] border-gray-200 text-[#191c1e]'}`}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`px-8 py-24 relative ${t.bgSurfaceLow}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:sticky lg:top-32 w-full lg:w-1/3">
            <h2 className={`text-4xl font-headline font-bold mb-6 ${t.textOnSurface}`}>Continuity & Support</h2>
            <p className={`mb-8 leading-relaxed ${t.textOnSurfaceVariant}`}>Software is a living organism. Our support tiers ensure your investment stays secure, updated, and performant long after the initial launch.</p>
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setContactOpen(true)}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${t.isDark ? 'border-[#47d6ff] text-[#47d6ff] group-hover:bg-[#47d6ff] group-hover:text-[#003543]' : 'border-[#006398] text-[#006398] group-hover:bg-[#006398] group-hover:text-white'}`}>
                <Headphones className="w-5 h-5" />
              </div>
              <span className={`font-bold ${t.textOnSurface}`}>Contact Specialist</span>
            </div>
          </motion.div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {support.map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className={`p-8 ${t.bgSurface} ${s.accent === 'primary' ? (t.isDark ? 'border-b-2 border-[#47d6ff]' : 'border-b-2 border-[#006398]') : s.accent === 'tertiary' ? (t.isDark ? 'border-b-2 border-[#d2bbff]' : 'border-b-2 border-[#00668a]') : (t.isDark ? 'border-b-2 border-[#b9c7e0]' : 'border-b-2 border-[#565e74]')} ${s.included ? 'col-span-1 md:col-span-2' : ''}`}
              >
                <h4 className={`text-xl font-bold mb-4 font-headline ${t.textOnSurface}`}>{s.title}</h4>
                <p className={`mb-6 text-sm ${t.textOnSurfaceVariant}`}>{s.description}</p>
                {s.features ? (
                  <ul className="space-y-2 text-sm">
                    {s.features.map((f, j) => (
                      <li key={j} className={`flex items-center gap-2 opacity-70 ${t.textOnSurface}`}><Check className="w-4 h-4" /> {f}</li>
                    ))}
                  </ul>
                ) : (
                  <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 ${t.textPrimary}`}>Included in every project <ArrowRight className="w-3 h-3" /></span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`px-8 py-24 text-center ${t.bgSurface}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`max-w-4xl mx-auto py-20 rounded-3xl border ${t.glassCard} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
          <h2 className={`text-4xl md:text-5xl font-headline font-bold mb-8 ${t.textOnSurface}`}>Ready to evolve your stack?</h2>
          <button onClick={() => setContactOpen(true)} className={`font-bold px-10 py-4 rounded-lg text-lg transition-all ${t.ctaGradient}`} style={t.ctaShadow}>Book a Technical Strategy Session</button>
          <p className={`mt-6 text-sm font-body uppercase tracking-widest ${t.textOnSurfaceVariant}`}>Limited Availability for Q4</p>
        </motion.div>
      </section>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Services;
