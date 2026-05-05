import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Cloud, Terminal, Shield, BadgeCheck, Headphones, Flag, BrainCircuit, BarChart3, Code2, Database as DatabaseIcon, Plug, Cpu, ArrowRight } from 'lucide-react';
import { heroData, techStackData, whyApzelio } from '../data/mock';
import { useThemeClasses } from '../hooks/useThemeClasses';
import ContactModal from '../components/ContactModal';

const iconMap = { Bot, Cloud, Terminal, Shield, BadgeCheck, Headphones, Flag, BrainCircuit, BarChart3, Code2, DatabaseIcon, Plug, Cpu };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Home = () => {
  const t = useThemeClasses();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="overflow-hidden pt-32">
      {/* Hero */}
      <section className={`relative min-h-screen flex items-center px-8 py-20 lg:py-0 max-w-7xl mx-auto ${t.isDark ? 'ether-bg' : ''}`}>
        {t.isDark && <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />}
        <div className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[120px] animate-blob mix-blend-screen opacity-50 ${t.isDark ? 'bg-[#47d6ff]/20' : 'bg-[#006398]/10'}`} />
        <div className={`absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[140px] animate-blob delay-500 mix-blend-screen opacity-50 ${t.isDark ? 'bg-[#d2bbff]/10' : 'bg-[#40a2e7]/10'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none ${t.isDark ? 'bg-gradient-to-b from-transparent via-[#0b1326]/40 to-[#0b1326]' : 'bg-gradient-to-b from-transparent via-[#f7f9fb]/40 to-[#f7f9fb]'}`} />

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className={`inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] uppercase rounded-full backdrop-blur-sm ${t.isDark ? 'text-[#47d6ff] border border-[#47d6ff]/30 bg-[#47d6ff]/10' : 'text-[#006398] border border-[#006398]/30 bg-[#006398]/10'}`}>
              {heroData.badge}
            </span>
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold font-headline leading-[0.95] tracking-tighter mb-8 ${t.textOnSurface}`}>
              {heroData.titleLine1}{' '}
              <span className={t.textGradient}>{heroData.titleHighlight}</span><br />
              <span className="relative">
                {heroData.titleLine2}
                <span className={`absolute -bottom-2 left-0 w-24 h-1 rounded-full animate-pulse ${t.isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} />
              </span>
            </h1>
            <motion.p variants={fadeUp} custom={1} className={`text-lg md:text-xl max-w-xl leading-relaxed mb-10 ${t.textOnSurfaceVariant}`}>
              {heroData.description}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-4">
              <button onClick={() => setContactOpen(true)} className={`group relative px-8 py-4 rounded-lg font-headline font-bold text-lg transition-all overflow-hidden ${t.ctaGradient}`} style={t.ctaShadow}>
                <span className="relative z-10">{heroData.ctaPrimary}</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
              <button onClick={() => navigate('/methodology')} className={`px-8 py-4 rounded-lg font-headline font-bold text-lg border transition-all ${t.isDark ? 'border-[#45464d]/30 hover:bg-[#222a3d] hover:border-[#47d6ff]/50 text-[#dae2fd]' : 'border-gray-300 hover:bg-[#e6e8ea] hover:border-[#006398]/50 text-[#191c1e]'}`}>
                {heroData.ctaSecondary}
              </button>
            </motion.div>
          </motion.div>

          {/* Animated Graphic */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <div className={`absolute inset-0 border-2 rounded-full animate-spin-slow ${t.isDark ? 'border-[#47d6ff]/20' : 'border-[#006398]/20'}`}>
                <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full kinetic-node ${t.isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} />
              </div>
              <div className={`absolute inset-8 border rounded-full animate-spin-slow-reverse ${t.isDark ? 'border-[#d2bbff]/20' : 'border-[#00668a]/20'}`}>
                <div className={`absolute top-1/2 -left-1 w-2 h-2 rounded-full ${t.isDark ? 'bg-[#d2bbff]' : 'bg-[#00668a]'}`} />
              </div>
              <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-3xl border flex items-center justify-center animate-float overflow-hidden ${t.glassCard} ${t.isDark ? 'border-[#47d6ff]/20' : 'border-[#006398]/20'}`}>
                <div className={`absolute inset-0 ${t.isDark ? 'bg-gradient-to-tr from-[#47d6ff]/10 via-transparent to-[#d2bbff]/10' : 'bg-gradient-to-tr from-[#006398]/10 via-transparent to-[#00668a]/10'}`} />
                <img alt="AI Intelligence" className="w-full h-full object-cover mix-blend-overlay opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvMMJoCUuOoOm-vlgTuAZ-3tCMT_rpe-Hvl1RIo0Btz5LkwRxP9tP-qdjAzNCeo3BS59jZWGXaPA73MqZizfsEqkXALaQpiu7zlRmPfGDMf6cPOTALZEdv7rI1w4y11ISK10mbo8benvhyZm4yQnIrbIKHQYpTtD9NLdMOjUtE0gchXo9zXdnOJfJW0IIpJS9YA3HnG6pp9-wVDUOt_YSa-vmLNY_6JgaMcuCU6REY9vLtkemrPn3VeUaPy_-CuP37ffo6dJpJjCr8" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className={`w-16 h-16 animate-pulse-slow ${t.textPrimary}`} />
                </div>
              </div>
              <div className={`absolute -top-4 -right-8 p-4 rounded-xl border animate-float shadow-xl ${t.glassCard} ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`} style={{ animationDelay: '700ms' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className={`text-[10px] font-body uppercase tracking-widest ${t.textSecondary}`}>Active Nodes</div>
                </div>
                <div className={`text-lg font-headline font-bold ${t.textOnSurface}`}>1,402+</div>
              </div>
              <div className={`absolute bottom-4 -left-12 p-4 rounded-xl border animate-float shadow-xl ${t.glassCard} ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`} style={{ animationDelay: '300ms' }}>
                <BarChart3 className={`w-5 h-5 mb-1 ${t.textTertiary}`} />
                <div className={`text-[10px] font-body uppercase tracking-widest ${t.textSecondary}`}>LLM Velocity</div>
                <div className={`text-lg font-headline font-bold ${t.textOnSurface}`}>98.2ms</div>
              </div>
            </div>
            <div className={`absolute w-[120%] h-[120%] rounded-full blur-[100px] -z-10 animate-pulse-slow ${t.isDark ? 'bg-[#47d6ff]/5' : 'bg-[#006398]/5'}`} />
          </motion.div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className={`py-24 px-8 relative ${t.bgSurfaceLow}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className={`text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4 ${t.textOnSurface}`}>Core Competencies</h2>
            <p className={`max-w-2xl ${t.textOnSurfaceVariant}`}>Precision engineering meets creative strategy. We offer specialized vertical expertise for modern enterprises.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`md:col-span-8 group relative overflow-hidden rounded-2xl p-10 border transition-all ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/5 hover:border-[#47d6ff]/20' : 'border-gray-200/50 hover:border-[#006398]/20'}`}>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <Bot className={`w-12 h-12 mb-6 ${t.textPrimary}`} />
                  <h3 className={`text-3xl font-headline font-bold mb-4 ${t.textOnSurface}`}>AI Integration & LLM Ops</h3>
                  <p className={`max-w-md text-lg ${t.textOnSurfaceVariant}`}>Harness the power of custom Large Language Models and agentic workflows integrated directly into your existing ecosystem.</p>
                </div>
                <div className="mt-12 flex gap-4">
                  {['PyTorch', 'LangChain'].map(tag => (
                    <span key={tag} className={`px-4 py-1.5 rounded-full text-xs font-body font-bold uppercase tracking-wider ${t.secondaryContainer}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><Bot className="w-60 h-60" /></div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className={`md:col-span-4 p-10 rounded-2xl border ${t.isDark ? 'bg-gradient-to-br from-[#2d3449] to-[#31394d] border-[#45464d]/5' : 'bg-gradient-to-br from-[#e0e3e5] to-[#f2f4f6] border-gray-200/50'}`}>
              <Cloud className={`w-12 h-12 mb-6 ${t.textTertiary}`} />
              <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Cloud Native Arch</h3>
              <p className={`text-base ${t.textOnSurfaceVariant}`}>Serverless and microservices architecture designed for infinite scale and zero downtime.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className={`md:col-span-4 p-10 rounded-2xl border ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200/50'}`}>
              <Terminal className={`w-12 h-12 mb-6 ${t.textPrimary}`} />
              <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Custom SaaS</h3>
              <p className={`text-base ${t.textOnSurfaceVariant}`}>Bespoke software solutions built with Go, Rust, and TypeScript for high-performance business logic.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className={`md:col-span-8 p-10 rounded-2xl border flex flex-col md:flex-row gap-10 items-center ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200/50'}`}>
              <div className="flex-1">
                <Shield className={`w-12 h-12 mb-6 ${t.textSecondary}`} />
                <h3 className={`text-2xl font-headline font-bold mb-4 ${t.textOnSurface}`}>Security Audits</h3>
                <p className={`text-base ${t.textOnSurfaceVariant}`}>Comprehensive penetration testing and compliance auditing for fintech and health-tech sectors.</p>
              </div>
              <div className={`w-full md:w-1/3 aspect-square rounded-xl border flex items-center justify-center overflow-hidden ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`}>
                <img alt="Security" className="w-full h-full object-cover rounded-xl opacity-40 grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-BZbwSbqGLMZktxLD2whEsNLTfjccenudaSZUa5nim14ISATJYT0wN3LlRTDQJr_GbSppa4Z7MPY5I4CtPaF7J9ZCm5rmj54ZsLowikZN1c_wUtcrpcABTmdTTBrDx9Ka31YynZafOSMMcsVNKQ9EwthyqcOFOzKtHagzf4K3D1BbfOmjcg_AR1Ei68MOP78kwttriv_3spTAJUf9lcIEEVG6gWwf8bI6HvrubLAVqz7ynzbA8fXEmXpITZSj_iLZsHyLo8MY9ts3" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={`py-24 px-8 overflow-hidden ${t.bgSurface}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
            <h2 className={`text-4xl md:text-5xl font-headline font-bold tracking-tight mb-8 ${t.textOnSurface}`}>
              Modern <span className={t.textTertiary}>Foundations</span>
            </h2>
            <p className={`text-lg leading-relaxed mb-8 ${t.textOnSurfaceVariant}`}>{techStackData.description}</p>
            <div className="grid grid-cols-2 gap-8">
              <div className={`p-6 rounded-xl border ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200/50'}`}>
                <div className={`font-headline font-bold mb-2 ${t.textPrimary}`}>Backend</div>
                <div className={`text-sm space-y-1 ${t.textOnSurface}`}>{techStackData.backend.map(x => <div key={x}>{x}</div>)}</div>
              </div>
              <div className={`p-6 rounded-xl border ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/5' : 'border-gray-200/50'}`}>
                <div className={`font-headline font-bold mb-2 ${t.textTertiary}`}>Frontend</div>
                <div className={`text-sm space-y-1 ${t.textOnSurface}`}>{techStackData.frontend.map(x => <div key={x}>{x}</div>)}</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, rotate: 8, scale: 0.9 }} whileInView={{ opacity: 0.4, rotate: 12, scale: 1.1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2 relative">
            <div className="grid grid-cols-3 gap-4">
              {[{ icon: Code2, a: false }, { icon: DatabaseIcon, a: true }, { icon: DatabaseIcon, a: false }, { icon: Plug, a: false }, { icon: BrainCircuit, a: true, ter: true }, { icon: Cloud, a: false }].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`h-32 rounded-xl flex items-center justify-center border ${item.a && !item.ter ? (t.isDark ? 'bg-[#47d6ff]/10 border-[#47d6ff]/20' : 'bg-[#006398]/10 border-[#006398]/20') : item.ter ? (t.isDark ? 'bg-[#d2bbff]/10 border-[#d2bbff]/20' : 'bg-[#00668a]/10 border-[#00668a]/20') : (t.bgSurfaceHighest + ' ' + (t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'))}`}>
                    <Icon className={`w-10 h-10 ${item.a && !item.ter ? t.textPrimary : item.ter ? t.textTertiary : t.textOnSurface}`} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`py-24 px-8 ${t.bgSurfaceLowest}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5">
              <h2 className={`text-4xl font-headline font-bold mb-6 ${t.textOnSurface}`}>Why ApZelio?</h2>
              <p className={`text-lg mb-12 ${t.textOnSurfaceVariant}`}>We treat every project as a flagship venture. Our commitment to excellence is reflected in our rigorous delivery standards.</p>
              <div className="space-y-8">
                {whyApzelio.map((item, i) => {
                  const Icon = iconMap[item.icon] || BadgeCheck;
                  const bg = item.accent === 'primary' ? (t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/10') : item.accent === 'tertiary' ? (t.isDark ? 'bg-[#d2bbff]/10' : 'bg-[#00668a]/10') : t.secondaryContainer;
                  const ic = item.accent === 'primary' ? t.textPrimary : item.accent === 'tertiary' ? t.textTertiary : t.textSecondary;
                  return (
                    <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bg}`}><Icon className={`w-5 h-5 ${ic}`} /></div>
                      <div>
                        <h4 className={`text-xl font-headline font-bold mb-2 ${t.textOnSurface}`}>{item.title}</h4>
                        <p className={t.textOnSurfaceVariant}>{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-7 relative flex items-center">
              <div className={`w-full aspect-video rounded-3xl overflow-hidden border shadow-2xl relative ${t.glassCard} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
                <img alt="The Team" className="w-full h-full object-cover mix-blend-overlay opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0SMLf6hcDdZZzde8RoUVSUomMs1FPDI-WyMPCNZBgDDDLT1qnTBbi31WcksFu7EFUQ013H4v0H7H8KswdQSytREyQNxnc7C2upvTEzcysLGj570oqDqicACosJkbxTbvfAIfiXL68SYk_pykgSNvK9tU10TDMO9veR09ZV3B0G_jopTzlLjlUJgFkpPpoicebv3oe-MNbuEjxnMZ01Z7zeAyFqoFsakUZBeJImBsYI8OR3bN7Qh02ubGcFtAt3j_UC9J_Mu7B59al" />
                <div className={`absolute inset-0 ${t.isDark ? 'bg-gradient-to-r from-[#060e20] to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`} />
                <div className="absolute bottom-10 left-10 max-w-sm">
                  <div className={`text-4xl font-headline font-bold mb-2 ${t.textOnSurface}`}>98.5%</div>
                  <div className={`text-sm font-body uppercase tracking-widest ${t.textPrimary}`}>Client Satisfaction Rate</div>
                </div>
              </div>
              <div className={`absolute -top-10 -right-10 w-40 h-40 border-r-2 border-t-2 rounded-tr-3xl hidden lg:block ${t.isDark ? 'border-[#47d6ff]/20' : 'border-[#006398]/20'}`} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-32 px-8 ${t.bgSurface}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`max-w-4xl mx-auto text-center p-16 rounded-[2rem] border relative ${t.glassCard} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-3xl opacity-20 ${t.isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} />
          <h2 className={`text-5xl font-headline font-bold mb-6 ${t.textOnSurface}`}>Ready to transcend?</h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${t.textOnSurfaceVariant}`}>Join the ranks of high-growth enterprises leveraging ApZelio's digital architecture.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setContactOpen(true)} className={`px-10 py-5 rounded-lg font-headline font-bold text-lg hover:scale-105 transition-transform shadow-xl ${t.ctaGradient}`} style={t.ctaShadow}>
              Initiate Consultation
            </button>
            <button onClick={() => navigate('/portfolio')} className={`px-10 py-5 rounded-lg font-headline font-bold text-lg border transition-colors ${t.isDark ? 'border-[#45464d] hover:bg-[#222a3d] text-[#dae2fd]' : 'border-gray-300 hover:bg-[#e6e8ea] text-[#191c1e]'}`}>
              Download Portfolio
            </button>
          </div>
        </motion.div>
      </section>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Home;
