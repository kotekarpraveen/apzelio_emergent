import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Gauge, Database, ArrowUpRight, ArrowRight, Cloud, Terminal, Shield, Network, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Portfolio = () => {
  const { hero, projects, techStack } = portfolioData;

  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 mb-32 relative" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(71, 214, 255, 0.05) 0%, transparent 70%)' }}>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full md:w-3/5">
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase bg-ap-secondary-container text-ap-primary rounded-full">
              {hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-ap-on-surface leading-[1.1] tracking-[-0.04em] mb-8">
              {hero.title} <span className="text-ap-primary italic">{hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-ap-on-surface-variant max-w-xl leading-relaxed mb-10">{hero.description}</p>
            <div className="flex flex-wrap gap-4">
              {hero.stats.map((stat, i) => {
                const Icon = stat.icon === 'Cpu' ? Cpu : Gauge;
                return (
                  <div key={i} className="flex items-center gap-3 glass-panel px-6 py-4 rounded-xl border border-ap-outline-variant/10">
                    <Icon className={`w-8 h-8 ${i === 0 ? 'text-ap-primary' : 'text-ap-tertiary'}`} />
                    <div>
                      <p className="text-xs text-ap-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                      <p className="text-xl font-headline font-bold text-ap-on-surface">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="w-full md:w-2/5 relative"
          >
            <div className="absolute -inset-4 bg-ap-primary/10 blur-[100px] rounded-full" />
            <img alt="Abstract architecture" className="rounded-2xl border border-ap-outline-variant/20 shadow-2xl relative z-10 w-full" src={hero.image} />
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-8 mb-40">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-headline font-bold mb-4 text-ap-on-surface">Selected Deployments</h2>
            <p className="text-ap-on-surface-variant max-w-md">Deep dives into high-stakes engineering projects where performance was the only metric that mattered.</p>
          </div>
          <div className="hidden md:block">
            <button className="flex items-center gap-2 text-ap-primary font-bold hover:gap-4 transition-all">
              View All Archives <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Featured Project */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-8 bg-ap-surface-container-low rounded-2xl overflow-hidden group border border-ap-outline-variant/5">
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-10 flex flex-col justify-between w-full md:w-1/2">
                <div>
                  <div className="flex gap-2 mb-6">
                    {projects[0].tags.map((tag) => (
                      <span key={tag} className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        tag === 'AI Platform' ? 'bg-ap-secondary-container text-ap-on-secondary-container' : 'bg-ap-surface-container-highest text-ap-primary'
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-headline font-bold mb-4 text-ap-on-surface group-hover:text-ap-primary transition-colors">{projects[0].title}</h3>
                  <p className="text-ap-on-surface-variant mb-8 leading-relaxed">{projects[0].description}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-headline font-bold text-ap-primary">{projects[0].metric.value}</span>
                    <span className="text-sm text-ap-on-surface-variant uppercase tracking-tighter leading-none">{projects[0].metric.label.split(' ').slice(0, 1)}<br />{projects[0].metric.label.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <button className="inline-flex items-center gap-2 font-bold text-ap-primary group/link">
                    Read Analysis <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img alt="Dashboard" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src={projects[0].image} />
              </div>
            </div>
          </motion.div>

          {/* Small Project */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="md:col-span-4 bg-ap-surface-container-low rounded-2xl p-8 flex flex-col justify-between border border-ap-outline-variant/5">
            <div>
              <div className="mb-6 h-12 w-12 rounded-lg bg-ap-tertiary-container flex items-center justify-center">
                <Database className="w-5 h-5 text-ap-tertiary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-3 text-ap-on-surface">{projects[1].title}</h3>
              <p className="text-ap-on-surface-variant mb-6 text-sm">{projects[1].description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {projects[1].techTags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-ap-surface-container-highest rounded text-ap-on-surface-variant uppercase">{tag}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-ap-outline-variant/10 pt-6">
              <p className="text-3xl font-headline font-bold text-ap-on-surface">
                {projects[1].metric.value} <span className="text-sm font-body text-ap-on-surface-variant uppercase tracking-widest">{projects[1].metric.label}</span>
              </p>
            </div>
          </motion.div>

          {/* Medium Project */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="md:col-span-5 bg-ap-surface-container-low rounded-2xl overflow-hidden border border-ap-outline-variant/5 group">
            <img alt="Global connectivity" className="w-full h-48 object-cover opacity-50 group-hover:opacity-80 transition-opacity" src={projects[2].image} />
            <div className="p-8">
              <h3 className="text-2xl font-headline font-bold mb-3 text-ap-on-surface">{projects[2].title}</h3>
              <p className="text-ap-on-surface-variant text-sm mb-6">{projects[2].description}</p>
              <div className="flex items-center gap-6">
                {projects[2].stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xl font-headline font-bold text-ap-primary">{stat.value}</p>
                    <p className="text-[10px] uppercase text-ap-on-surface-variant">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Wide Project */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-7 bg-ap-surface-container-high rounded-2xl p-10 relative overflow-hidden flex flex-col justify-center border border-ap-outline-variant/10">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-ap-primary/5 to-transparent pointer-events-none" />
            <div className="max-w-md relative z-10">
              <span className="text-ap-primary text-xs font-bold uppercase tracking-widest mb-4 block">{projects[3].badge}</span>
              <h3 className="text-3xl font-headline font-bold mb-4 text-ap-on-surface">{projects[3].title}</h3>
              <p className="text-ap-on-surface-variant leading-relaxed mb-8">{projects[3].description}</p>
              <button className="bg-ap-surface-container-highest px-6 py-3 rounded-lg text-sm font-bold border border-ap-outline-variant/20 hover:bg-ap-surface-bright transition-colors text-ap-on-surface">
                Technical Whitepaper
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-ap-surface-container-low py-32 mb-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl font-headline font-bold mb-8 text-ap-on-surface">The Hard <span className="text-ap-primary">Tech.</span></h2>
              <p className="text-ap-on-surface-variant text-lg mb-12 max-w-lg leading-relaxed">
                We don't just "use" technology; we contribute to it. Our stack is chosen for its performance, stability, and future-proof scalability.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="font-headline font-bold text-ap-on-surface">Language Core</h4>
                  <ul className="text-ap-on-surface-variant space-y-1 text-sm">
                    {techStack.languages.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-headline font-bold text-ap-on-surface">Cloud Ops</h4>
                  <ul className="text-ap-on-surface-variant space-y-1 text-sm">
                    {techStack.cloudOps.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-3 gap-4"
            >
              {[Cloud, Terminal, Shield, Network, Database, Cpu].map((Icon, i) => (
                <div key={i} className="aspect-square bg-ap-surface-container-highest rounded-xl flex items-center justify-center border border-ap-outline-variant/10">
                  <Icon className="w-10 h-10 text-ap-primary opacity-40" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-8 mb-40 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-br from-ap-surface-container-high to-ap-surface-container-low p-16 rounded-[2rem] border border-ap-outline-variant/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-40 h-40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-ap-on-surface">Ready to scale the <span className="text-ap-primary">Ether?</span></h2>
          <p className="text-ap-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
            Whether you need a legacy migration or a ground-up AI platform architecture, we bring the surgical precision required for modern scale.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="bg-ap-primary text-ap-on-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(71,214,255,0.3)] transition-all">
              Schedule an Architect Call
            </button>
            <button className="bg-ap-surface-container-highest text-ap-on-surface px-10 py-4 rounded-xl font-bold text-lg border border-ap-outline-variant/30 hover:border-ap-primary/50 transition-all">
              Review Technical Process
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Portfolio;
