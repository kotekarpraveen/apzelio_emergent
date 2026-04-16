import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Cloud, Terminal, Shield, BadgeCheck, Headphones, Flag, BrainCircuit, BarChart3, Code2, Database as DatabaseIcon, Plug, Cpu, ArrowRight } from 'lucide-react';
import { heroData, coreCompetencies, techStackData, whyApzelio } from '../data/mock';

const iconMap = {
  Bot, Cloud, Terminal, Shield, BadgeCheck, Headphones, Flag, BrainCircuit, BarChart3, Code2, DatabaseIcon, Plug, Cpu,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Home = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-8 py-20 lg:py-0 max-w-7xl mx-auto ether-bg">
        {/* Animated Background */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-ap-primary/20 rounded-full blur-[120px] animate-blob mix-blend-screen opacity-50" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-ap-tertiary/10 rounded-full blur-[140px] animate-blob delay-500 mix-blend-screen opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-ap-surface/40 to-ap-surface pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          {/* Left Content */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] uppercase text-ap-primary border border-ap-primary/30 rounded-full bg-ap-primary/10 backdrop-blur-sm">
              {heroData.badge}
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-headline leading-[0.95] tracking-tighter mb-8">
              {heroData.titleLine1}{' '}
              <span className="text-gradient">{heroData.titleHighlight}</span>
              <br />
              <span className="relative">
                {heroData.titleLine2}
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-ap-primary rounded-full animate-pulse" />
              </span>
            </h1>
            <motion.p variants={fadeUp} custom={1} className="text-lg md:text-xl text-ap-on-surface-variant max-w-xl leading-relaxed mb-10">
              {heroData.description}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-4">
              <button className="group relative hero-gradient-cta text-[#003543] px-8 py-4 rounded-lg font-headline font-bold text-lg hover:shadow-2xl transition-all overflow-hidden" style={{ boxShadow: '0 4px 30px rgba(71, 214, 255, 0.3)' }}>
                <span className="relative z-10">{heroData.ctaPrimary}</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
              <button className="px-8 py-4 rounded-lg font-headline font-bold text-lg border border-ap-outline-variant/30 hover:bg-ap-surface-container-high transition-all hover:border-ap-primary/50 text-ap-on-surface">
                {heroData.ctaSecondary}
              </button>
            </motion.div>
          </motion.div>

          {/* Right - Animated Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-2 border-ap-primary/20 rounded-full animate-spin-slow">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-ap-primary rounded-full kinetic-node" />
              </div>
              {/* Middle Ring */}
              <div className="absolute inset-8 border border-ap-tertiary/20 rounded-full animate-spin-slow-reverse">
                <div className="absolute top-1/2 -left-1 w-2 h-2 bg-ap-tertiary rounded-full kinetic-node" />
              </div>
              {/* Inner Core */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl glass-card border border-ap-primary/20 flex items-center justify-center animate-float overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-ap-primary/10 via-transparent to-ap-tertiary/10" />
                <img
                  alt="AI Intelligence"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvMMJoCUuOoOm-vlgTuAZ-3tCMT_rpe-Hvl1RIo0Btz5LkwRxP9tP-qdjAzNCeo3BS59jZWGXaPA73MqZizfsEqkXALaQpiu7zlRmPfGDMf6cPOTALZEdv7rI1w4y11ISK10mbo8benvhyZm4yQnIrbIKHQYpTtD9NLdMOjUtE0gchXo9zXdnOJfJW0IIpJS9YA3HnG6pp9-wVDUOt_YSa-vmLNY_6JgaMcuCU6REY9vLtkemrPn3VeUaPy_-CuP37ffo6dJpJjCr8"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="w-16 h-16 text-ap-primary animate-pulse-slow" />
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-8 glass-card p-4 rounded-xl border border-ap-outline-variant/20 animate-float shadow-xl" style={{ animationDelay: '700ms' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="text-[10px] font-body uppercase tracking-widest text-ap-secondary">Active Nodes</div>
                </div>
                <div className="text-lg font-headline font-bold text-ap-on-surface">1,402+</div>
              </div>
              <div className="absolute bottom-4 -left-12 glass-card p-4 rounded-xl border border-ap-outline-variant/20 animate-float shadow-xl" style={{ animationDelay: '300ms' }}>
                <BarChart3 className="w-5 h-5 text-ap-tertiary mb-1" />
                <div className="text-[10px] font-body uppercase tracking-widest text-ap-secondary">LLM Velocity</div>
                <div className="text-lg font-headline font-bold text-ap-on-surface">98.2ms</div>
              </div>
            </div>
            <div className="absolute w-[120%] h-[120%] bg-ap-primary/5 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
          </motion.div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="bg-ap-surface-container-low py-24 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4 text-ap-on-surface">Core Competencies</h2>
            <p className="text-ap-on-surface-variant max-w-2xl">Precision engineering meets creative strategy. We offer specialized vertical expertise for modern enterprises.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* AI Card - Large */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-ap-surface-container-highest p-10 border border-ap-outline-variant/5 hover:border-ap-primary/20 transition-all">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <Bot className="w-12 h-12 text-ap-primary mb-6" />
                  <h3 className="text-3xl font-headline font-bold mb-4 text-ap-on-surface">AI Integration & LLM Ops</h3>
                  <p className="text-ap-on-surface-variant max-w-md text-lg">Harness the power of custom Large Language Models and agentic workflows integrated directly into your existing ecosystem.</p>
                </div>
                <div className="mt-12 flex gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-ap-secondary-container text-ap-on-secondary-container text-xs font-body font-bold uppercase tracking-wider">PyTorch</span>
                  <span className="px-4 py-1.5 rounded-full bg-ap-secondary-container text-ap-on-secondary-container text-xs font-body font-bold uppercase tracking-wider">LangChain</span>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Bot className="w-60 h-60" />
              </div>
            </motion.div>

            {/* Cloud - Small */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="md:col-span-4 bg-gradient-to-br from-ap-surface-container-highest to-ap-surface-bright p-10 rounded-2xl border border-ap-outline-variant/5">
              <Cloud className="w-12 h-12 text-ap-tertiary mb-6" />
              <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Cloud Native Arch</h3>
              <p className="text-ap-on-surface-variant text-base">Serverless and microservices architecture designed for infinite scale and zero downtime.</p>
            </motion.div>

            {/* Custom SaaS - Small */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="md:col-span-4 bg-ap-surface-container-highest p-10 rounded-2xl border border-ap-outline-variant/5">
              <Terminal className="w-12 h-12 text-ap-primary mb-6" />
              <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Custom SaaS</h3>
              <p className="text-ap-on-surface-variant text-base">Bespoke software solutions built with Go, Rust, and TypeScript for high-performance business logic.</p>
            </motion.div>

            {/* Security - Large */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-8 bg-ap-surface-container-highest p-10 rounded-2xl border border-ap-outline-variant/5 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <Shield className="w-12 h-12 text-ap-secondary mb-6" />
                <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Security Audits</h3>
                <p className="text-ap-on-surface-variant text-base">Comprehensive penetration testing and compliance auditing for fintech and health-tech sectors.</p>
              </div>
              <div className="w-full md:w-1/3 aspect-square rounded-xl bg-ap-surface-container-low border border-ap-outline-variant/20 flex items-center justify-center overflow-hidden">
                <img
                  alt="Security"
                  className="w-full h-full object-cover rounded-xl opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-BZbwSbqGLMZktxLD2whEsNLTfjccenudaSZUa5nim14ISATJYT0wN3LlRTDQJr_GbSppa4Z7MPY5I4CtPaF7J9ZCm5rmj54ZsLowikZN1c_wUtcrpcABTmdTTBrDx9Ka31YynZafOSMMcsVNKQ9EwthyqcOFOzKtHagzf4K3D1BbfOmjcg_AR1Ei68MOP78kwttriv_3spTAJUf9lcIEEVG6gWwf8bI6HvrubLAVqz7ynzbA8fXEmXpITZSj_iLZsHyLo8MY9ts3"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-8 text-ap-on-surface">
              Modern <span className="text-ap-tertiary">Foundations</span>
            </h2>
            <p className="text-ap-on-surface-variant text-lg leading-relaxed mb-8">
              {techStackData.description}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 rounded-xl bg-ap-surface-container-low border border-ap-outline-variant/5">
                <div className="font-headline font-bold text-ap-primary mb-2">Backend</div>
                <div className="text-ap-on-surface text-sm space-y-1">
                  {techStackData.backend.map((t) => <div key={t}>{t}</div>)}
                </div>
              </div>
              <div className="p-6 rounded-xl bg-ap-surface-container-low border border-ap-outline-variant/5">
                <div className="font-headline font-bold text-ap-tertiary mb-2">Frontend</div>
                <div className="text-ap-on-surface text-sm space-y-1">
                  {techStackData.frontend.map((t) => <div key={t}>{t}</div>)}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 8, scale: 0.9 }}
            whileInView={{ opacity: 0.4, rotate: 12, scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Code2, accent: false },
                { icon: DatabaseIcon, accent: true },
                { icon: DatabaseIcon, accent: false },
                { icon: Plug, accent: false },
                { icon: BrainCircuit, accent: true, tertiary: true },
                { icon: Cloud, accent: false },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`h-32 rounded-xl flex items-center justify-center border ${
                      item.accent && !item.tertiary
                        ? 'bg-ap-primary/10 border-ap-primary/20'
                        : item.tertiary
                        ? 'bg-ap-tertiary/10 border-ap-tertiary/20'
                        : 'bg-ap-surface-container-highest border-ap-outline-variant/20'
                    }`}
                  >
                    <Icon className={`w-10 h-10 ${item.accent && !item.tertiary ? 'text-ap-primary' : item.tertiary ? 'text-ap-tertiary' : 'text-ap-on-surface'}`} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8 bg-ap-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5">
              <h2 className="text-4xl font-headline font-bold mb-6 text-ap-on-surface">Why ApZelio?</h2>
              <p className="text-ap-on-surface-variant text-lg mb-12">We treat every project as a flagship venture. Our commitment to excellence is reflected in our rigorous delivery standards.</p>
              <div className="space-y-8">
                {whyApzelio.map((item, i) => {
                  const Icon = iconMap[item.icon] || BadgeCheck;
                  const bgClass = item.accent === 'primary' ? 'bg-ap-primary/10' : item.accent === 'tertiary' ? 'bg-ap-tertiary/10' : 'bg-ap-secondary-container';
                  const iconClass = item.accent === 'primary' ? 'text-ap-primary' : item.accent === 'tertiary' ? 'text-ap-tertiary' : 'text-ap-secondary';
                  return (
                    <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-6">
                      <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${iconClass}`} />
                      </div>
                      <div>
                        <h4 className="text-xl font-headline font-bold mb-2 text-ap-on-surface">{item.title}</h4>
                        <p className="text-ap-on-surface-variant">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative flex items-center"
            >
              <div className="w-full aspect-video rounded-3xl overflow-hidden glass-card border border-ap-outline-variant/10 shadow-2xl relative">
                <img
                  alt="The Team"
                  className="w-full h-full object-cover mix-blend-overlay opacity-60"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0SMLf6hcDdZZzde8RoUVSUomMs1FPDI-WyMPCNZBgDDDLT1qnTBbi31WcksFu7EFUQ013H4v0H7H8KswdQSytREyQNxnc7C2upvTEzcysLGj570oqDqicACosJkbxTbvfAIfiXL68SYk_pykgSNvK9tU10TDMO9veR09ZV3B0G_jopTzlLjlUJgFkpPpoicebv3oe-MNbuEjxnMZ01Z7zeAyFqoFsakUZBeJImBsYI8OR3bN7Qh02ubGcFtAt3j_UC9J_Mu7B59al"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ap-surface-container-lowest to-transparent" />
                <div className="absolute bottom-10 left-10 max-w-sm">
                  <div className="text-4xl font-headline font-bold mb-2 text-ap-on-surface">98.5%</div>
                  <div className="text-sm font-body uppercase tracking-widest text-ap-primary">Client Satisfaction Rate</div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 border-r-2 border-t-2 border-ap-primary/20 rounded-tr-3xl hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center glass-card p-16 rounded-[2rem] border border-ap-outline-variant/10 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-ap-primary rounded-full blur-3xl opacity-20" />
          <h2 className="text-5xl font-headline font-bold mb-6 text-ap-on-surface">Ready to transcend?</h2>
          <p className="text-ap-on-surface-variant text-xl mb-12 max-w-2xl mx-auto">
            Join the ranks of high-growth enterprises leveraging ApZelio's digital architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="hero-gradient-cta text-[#003543] px-10 py-5 rounded-lg font-headline font-bold text-lg hover:scale-105 transition-transform shadow-xl" style={{ boxShadow: '0 4px 30px rgba(71, 214, 255, 0.2)' }}>
              Initiate Consultation
            </button>
            <button className="px-10 py-5 rounded-lg font-headline font-bold text-lg border border-ap-outline-variant hover:bg-ap-surface-container-high transition-colors text-ap-on-surface">
              Download Portfolio
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
