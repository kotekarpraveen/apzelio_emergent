import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Gavel, Users, MessageSquare, Star, Zap, BadgeCheck, Rocket } from 'lucide-react';
import { methodologyData } from '../data/mock';
import { useThemeClasses } from '../hooks/useThemeClasses';
import ContactModal from '../components/ContactModal';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};
const iconMap = { Navigation, Gavel, Users, MessageSquare };

const Methodology = () => {
  const { hero, usAdvantage, timeline, lifecycle } = methodologyData;
  const t = useThemeClasses();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className={`pt-32 ${t.bgSurface}`}>
      <section className="relative px-8 py-24 overflow-hidden">
        <div className={`absolute top-0 right-0 w-1/2 h-full -z-10 opacity-50 ${t.isDark ? 'ethereal-glow' : ''}`} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-7">
              <span className={`font-body text-sm tracking-[0.2em] uppercase mb-4 block font-bold ${t.textPrimary}`}>{hero.label}</span>
              <h1 className={`text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-tight mb-8 ${t.textOnSurface}`}>
                {hero.titleLine1}<br /><span className={t.textOnSurfaceVariant}>{hero.titleLine2}</span>
              </h1>
              <p className={`text-xl max-w-2xl leading-relaxed mb-10 ${t.textOnSurfaceVariant}`}>{hero.description}</p>
              <div className="flex flex-wrap gap-4">
                {hero.chips.map(chip => (
                  <div key={chip} className={`flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs tracking-wider ${t.secondaryContainer}`}>
                    {chip.includes('US') ? <Star className="w-3 h-3" fill="currentColor" /> : <Zap className="w-3 h-3" fill="currentColor" />}{chip}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="lg:col-span-5 relative">
              <div className={`aspect-square rounded-xl overflow-hidden p-1 ${t.glassPanel}`}>
                <img className="w-full h-full object-cover rounded-lg opacity-80" src={hero.image} alt="Command Center" />
              </div>
              <div className={`absolute -bottom-6 -left-6 p-6 rounded-lg shadow-2xl border ${t.glassPanel} ${t.isDark ? 'border-[#45464d]/15' : 'border-gray-200'}`}>
                <div className={`text-3xl font-headline font-bold ${t.textPrimary}`}>{hero.stat.value}</div>
                <div className={`text-xs font-body tracking-widest uppercase ${t.textOnSurfaceVariant}`}>{hero.stat.label}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`py-24 px-8 ${t.bgSurfaceLow}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:w-1/3">
              <h2 className={`text-3xl font-headline font-bold mb-6 ${t.textOnSurface}`}>The US-Based<br />Advantage.</h2>
              <p className={`leading-relaxed ${t.textOnSurfaceVariant}`}>No time-zone lag. No translation fatigue. Just high-bandwidth collaboration with senior engineers.</p>
            </motion.div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {usAdvantage.map((item, i) => {
                const Icon = iconMap[item.icon] || Navigation;
                return (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className={`p-8 rounded-xl border transition-all ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/10 hover:bg-[#2d3449]' : 'border-gray-200 hover:bg-[#e6e8ea]'}`}>
                    <Icon className={`w-8 h-8 mb-4 ${t.textPrimary}`} />
                    <h3 className={`text-xl font-headline font-bold mb-3 ${t.textOnSurface}`}>{item.title}</h3>
                    <p className={`text-sm leading-relaxed ${t.textOnSurfaceVariant}`}>{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-32 px-8 overflow-hidden ${t.bgSurface}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <h2 className={`text-4xl md:text-5xl font-headline font-bold mb-6 ${t.textOnSurface}`}>Execution Roadmap</h2>
            <p className={`max-w-2xl mx-auto ${t.textOnSurfaceVariant}`}>Our iterative sprint-based approach ensures transparency and allows for pivot-ready development at every milestone.</p>
          </motion.div>
          <div className="relative">
            <div className={`absolute top-1/2 left-0 w-full h-[2px] hidden lg:block -translate-y-1/2 ${t.isDark ? 'bg-[#45464d]/20' : 'bg-gray-200'}`} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {timeline.map((step, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className={`relative z-10 ${i % 2 === 0 ? 'lg:pt-12' : 'lg:pb-12 lg:mt-24'}`}>
                  <div className={`lg:absolute ${i % 2 === 0 ? 'lg:top-0' : 'lg:bottom-0'} lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center border-4 ring-2 mb-6 lg:mb-0 ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#0b1326] ring-[#47d6ff]' : 'border-[#f7f9fb] ring-[#006398]'}`}>
                    <span className={`font-headline font-bold ${t.textPrimary}`}>{step.step}</span>
                  </div>
                  <div className={`p-8 rounded-xl border ${t.glassPanel} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
                    <h3 className={`text-xl font-headline font-bold mb-4 ${t.textOnSurface}`}>{step.title}</h3>
                    <p className={`text-sm leading-relaxed mb-6 ${t.textOnSurfaceVariant}`}>{step.desc}</p>
                    <ul className={`space-y-2 text-xs font-body ${t.isDark ? 'text-[#dae2fd]/70' : 'text-[#191c1e]/70'}`}>
                      {step.tags.map(tag => (<li key={tag} className="flex items-center gap-2"><span className={`w-1.5 h-1.5 rounded-full ${t.isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} />{tag}</li>))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-24 px-8 ${t.bgSurfaceContainer}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`md:col-span-2 p-12 rounded-xl relative overflow-hidden group ${t.bgSurfaceHigh}`}>
              <div className="absolute top-0 right-0 p-8"><Rocket className={`w-24 h-24 group-hover:scale-110 transition-transform duration-700 ${t.isDark ? 'text-[#47d6ff]/20' : 'text-[#006398]/10'}`} /></div>
              <h2 className={`text-3xl font-headline font-bold mb-6 ${t.textOnSurface}`}>Full-Support Lifecycle</h2>
              <p className={`max-w-md mb-8 leading-relaxed ${t.textOnSurfaceVariant}`}>We don't just "hand over" code. Our partnership extends into post-launch stability.</p>
              <div className="flex gap-4">
                <div className="flex flex-col"><span className={`text-2xl font-bold ${t.textPrimary}`}>{lifecycle.monitoring}</span><span className={`text-xs font-body uppercase tracking-widest ${t.textOnSurfaceVariant}`}>Monitoring</span></div>
                <div className={`w-px h-10 self-center ${t.isDark ? 'bg-[#45464d]/30' : 'bg-gray-200'}`} />
                <div className="flex flex-col"><span className={`text-2xl font-bold ${t.textPrimary}`}>{lifecycle.sla}</span><span className={`text-xs font-body uppercase tracking-widest ${t.textOnSurfaceVariant}`}>SLA Response</span></div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className={`p-8 rounded-xl flex flex-col justify-end ${t.isDark ? 'bg-[#47d6ff] text-[#001f28]' : 'bg-[#006398] text-white'}`}>
              <BadgeCheck className="w-10 h-10 mb-4" fill="currentColor" />
              <h3 className="text-2xl font-headline font-bold mb-2">Quality Oath</h3>
              <p className="text-sm font-medium leading-relaxed opacity-90">Every line of code is peer-reviewed by US leads before it ever reaches a staging environment.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className={`md:col-span-1 p-8 rounded-xl border ${t.bgSurfaceLowest} ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`}>
              <h4 className={`font-headline font-bold mb-4 ${t.textOnSurface}`}>Agile Governance</h4>
              <p className={`text-sm leading-relaxed ${t.textOnSurfaceVariant}`}>We utilize Jira, Slack, and Confluence to provide you with total visibility into our velocity and task backlog.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-2 flex flex-col md:flex-row gap-6">
              {['CI/CD Mastery', 'Tech Evolution'].map((title, i) => (
                <div key={i} className={`flex-1 p-8 rounded-xl border ${t.surfaceVariant} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
                  <h4 className={`font-headline font-bold mb-3 ${t.textOnSurface}`}>{title}</h4>
                  <p className={`text-sm ${t.textOnSurfaceVariant}`}>{i === 0 ? 'Automated pipelines ensure that every commit is tested and deployed with zero downtime.' : 'Quarterly technical reviews to ensure your stack remains modern and competitive.'}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`py-32 px-8 text-center relative overflow-hidden ${t.bgSurface}`}>
        {t.isDark && <div className="absolute inset-0 ethereal-glow -z-10 opacity-30" />}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-headline font-bold tracking-tight mb-8 ${t.textOnSurface}`}>Ready to Build<br /><span className={t.textPrimary}>Without Friction?</span></h2>
          <p className={`text-lg mb-12 ${t.textOnSurfaceVariant}`}>Skip the offshore headaches. Experience the precision of an elite US-based engineering squad.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setContactOpen(true)} className={`px-10 py-4 rounded-lg font-bold hover:scale-105 transition-transform ${t.ctaGradient}`} style={t.ctaShadow}>Schedule Strategy Session</button>
            <button onClick={() => window.location.href='/portfolio'} className={`px-10 py-4 rounded-lg font-bold border transition-colors ${t.isDark ? 'border-[#45464d]/30 hover:bg-[#222a3d] text-[#dae2fd]' : 'border-gray-300 hover:bg-[#e6e8ea] text-[#191c1e]'}`}>View Case Studies</button>
          </div>
        </motion.div>
      </section>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Methodology;
