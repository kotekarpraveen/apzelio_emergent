import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Database, Rocket, Network, Building2, CheckCircle, Check, Headphones, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Services = () => {
  const { hero, aiDriven, tiers, support } = servicesData;

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative px-8 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ap-tertiary/10 rounded-full blur-[120px] -z-10" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-7xl mx-auto">
          <span className="uppercase tracking-widest text-ap-primary font-body text-sm mb-4 block font-bold">{hero.label}</span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-tight max-w-4xl mb-8 text-ap-on-surface">
            {hero.title} <span className="text-gradient">{hero.titleHighlight}</span> {hero.titleEnd}
          </h1>
          <p className="text-ap-on-surface-variant text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            {hero.description}
          </p>
        </motion.div>
      </section>

      {/* AI-Driven Development */}
      <section className="px-8 py-20 bg-ap-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7">
              <div className="glass-card p-8 md:p-12 rounded-xl border border-ap-outline-variant/10 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-ap-primary/5 rounded-full blur-3xl group-hover:bg-ap-primary/10 transition-all" />
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ap-tertiary-container text-ap-on-tertiary-container text-xs font-bold mb-6">
                  <Sparkles className="w-3 h-3" />
                  {aiDriven.badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 text-slate-50">{aiDriven.title}</h2>
                <p className="text-ap-on-surface-variant text-lg mb-8 leading-relaxed">
                  {aiDriven.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiDriven.features.map((f, i) => {
                    const Icon = f.icon === 'Brain' ? Brain : Database;
                    return (
                      <div key={i} className="flex gap-4">
                        <Icon className="w-5 h-5 text-ap-primary mt-1 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-100">{f.title}</h4>
                          <p className="text-sm text-ap-on-surface-variant">{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <img
                alt="AI Visualization"
                className="rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-square w-full"
                src={aiDriven.image}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="px-8 py-24 bg-ap-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-4 text-ap-on-surface">Scalable Engineering Tiers</h2>
            <p className="text-ap-on-surface-variant">Precision-crafted solutions for every stage of the business lifecycle.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-1 bg-ap-surface-container border border-ap-outline-variant/10 p-8 rounded-xl flex flex-col h-full hover:bg-ap-surface-bright transition-colors">
              <div className="w-12 h-12 rounded-lg bg-ap-secondary-container flex items-center justify-center mb-6">
                <Rocket className="w-5 h-5 text-ap-secondary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Rapid MVP & Growth</h3>
              <p className="text-ap-on-surface-variant mb-8">Fast-track your entry into the market with high-fidelity prototypes and scalable initial releases designed for validation.</p>
              <ul className="space-y-3 mt-auto">
                {tiers[0].features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-ap-on-surface">
                    <CheckCircle className="w-4 h-4 text-ap-primary" fill="currentColor" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tier 2 - Popular */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="md:col-span-2 bg-ap-surface-container-high border border-ap-primary/20 p-8 rounded-xl flex flex-col md:flex-row gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-ap-primary font-bold bg-ap-primary/10 px-3 py-1 rounded text-xs">MOST POPULAR</span>
              </div>
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-ap-primary-container flex items-center justify-center mb-6">
                  <Network className="w-5 h-5 text-ap-primary" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 text-ap-on-surface">Scale-Up Infrastructure</h3>
                <p className="text-ap-on-surface-variant mb-8">{tiers[1].description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {tiers[1].subFeatures.map((f, i) => (
                    <div key={i} className="p-4 bg-ap-surface-variant/40 rounded-lg">
                      <h5 className="font-bold text-sm mb-1 text-ap-on-surface">{f.title}</h5>
                      <p className="text-xs text-ap-on-surface-variant">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-1/3">
                <img alt="Infrastructure" className="w-full h-full object-cover rounded-lg grayscale opacity-50" src={tiers[1].image} />
              </div>
            </motion.div>

            {/* Tier 3 - Enterprise */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="md:col-span-3 bg-ap-surface-container-highest p-10 rounded-xl flex flex-col md:flex-row items-center gap-12 group">
              <div className="flex-1 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-ap-tertiary-container flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <Building2 className="w-8 h-8 text-ap-tertiary" />
                </div>
                <h3 className="text-3xl font-headline font-bold mb-4 text-ap-on-surface">{tiers[2].title}</h3>
                <p className="text-ap-on-surface-variant text-lg max-w-2xl">{tiers[2].description}</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-end max-w-sm">
                {tiers[2].tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-ap-surface-bright rounded-full text-xs font-bold uppercase tracking-widest border border-ap-outline-variant/30 text-ap-on-surface">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="px-8 py-24 bg-ap-surface-container-low relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:sticky lg:top-32 w-full lg:w-1/3">
            <h2 className="text-4xl font-headline font-bold mb-6 text-ap-on-surface">Continuity & Support</h2>
            <p className="text-ap-on-surface-variant mb-8 leading-relaxed">Software is a living organism. Our support tiers ensure your investment stays secure, updated, and performant long after the initial launch.</p>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-ap-primary text-ap-primary group-hover:bg-ap-primary group-hover:text-ap-on-primary transition-all">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="font-bold text-ap-on-surface">Contact Specialist</span>
            </div>
          </motion.div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {support.map((s, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`p-8 bg-ap-surface ${
                  s.accent === 'primary' ? 'border-b-2 border-ap-primary' : s.accent === 'tertiary' ? 'border-b-2 border-ap-tertiary' : 'border-b-2 border-ap-secondary'
                } ${s.included ? 'col-span-1 md:col-span-2' : ''}`}
              >
                <h4 className="text-xl font-bold mb-4 font-headline text-ap-on-surface">{s.title}</h4>
                <p className="text-ap-on-surface-variant mb-6 text-sm">{s.description}</p>
                {s.features ? (
                  <ul className="space-y-2 text-sm">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 opacity-70 text-ap-on-surface">
                        <Check className="w-4 h-4" /> {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-ap-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    Included in every project <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto py-20 glass-card rounded-3xl border border-ap-outline-variant/10">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 text-ap-on-surface">Ready to evolve your stack?</h2>
          <button className="hero-gradient-cta text-[#003543] font-bold px-10 py-4 rounded-lg text-lg hover:shadow-[0_0_30px_-5px_rgba(71,214,255,0.4)] transition-all">
            Book a Technical Strategy Session
          </button>
          <p className="mt-6 text-ap-on-surface-variant text-sm font-body uppercase tracking-widest">Limited Availability for Q4</p>
        </motion.div>
      </section>
    </main>
  );
};

export default Services;
