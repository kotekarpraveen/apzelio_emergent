import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Gavel, Users, MessageSquare, Star, Zap, BadgeCheck, Rocket, ArrowRight } from 'lucide-react';
import { methodologyData } from '../data/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const iconMap = { Navigation, Gavel, Users, MessageSquare };

const Methodology = () => {
  const { hero, usAdvantage, timeline, lifecycle } = methodologyData;

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative px-8 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full ethereal-glow -z-10 opacity-50" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-7">
              <span className="text-ap-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block font-bold">{hero.label}</span>
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-ap-on-surface tracking-tighter leading-tight mb-8">
                {hero.titleLine1}<br />
                <span className="text-ap-on-surface-variant">{hero.titleLine2}</span>
              </h1>
              <p className="text-xl text-ap-on-surface-variant max-w-2xl leading-relaxed mb-10">{hero.description}</p>
              <div className="flex flex-wrap gap-4">
                {hero.chips.map((chip) => (
                  <div key={chip} className="flex items-center gap-2 px-4 py-2 bg-ap-secondary-container rounded-full text-ap-on-secondary-container font-body text-xs tracking-wider">
                    {chip.includes('US') ? <Star className="w-3 h-3" fill="currentColor" /> : <Zap className="w-3 h-3" fill="currentColor" />}
                    {chip}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-square rounded-xl overflow-hidden glass-panel p-1">
                <img className="w-full h-full object-cover rounded-lg opacity-80" src={hero.image} alt="Command Center" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-lg shadow-2xl border border-ap-outline-variant/15">
                <div className="text-3xl font-headline font-bold text-ap-primary">{hero.stat.value}</div>
                <div className="text-xs font-body text-ap-on-surface-variant tracking-widest uppercase">{hero.stat.label}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* US Advantage */}
      <section className="bg-ap-surface-container-low py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:w-1/3">
              <h2 className="text-3xl font-headline font-bold mb-6 text-ap-on-surface">The US-Based<br />Advantage.</h2>
              <p className="text-ap-on-surface-variant leading-relaxed">
                No time-zone lag. No translation fatigue. Just high-bandwidth collaboration with senior engineers who understand your market and your urgency.
              </p>
            </motion.div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {usAdvantage.map((item, i) => {
                const Icon = iconMap[item.icon] || Navigation;
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="p-8 bg-ap-surface-container-highest rounded-xl border border-ap-outline-variant/10 hover:bg-ap-surface-variant transition-all"
                  >
                    <Icon className="w-8 h-8 text-ap-primary mb-4" />
                    <h3 className="text-xl font-headline font-bold mb-3 text-ap-on-surface">{item.title}</h3>
                    <p className="text-sm text-ap-on-surface-variant leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-ap-on-surface">Execution Roadmap</h2>
            <p className="text-ap-on-surface-variant max-w-2xl mx-auto">Our iterative sprint-based approach ensures transparency and allows for pivot-ready development at every milestone.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-ap-outline-variant/20 hidden lg:block -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {timeline.map((step, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className={`relative z-10 ${i % 2 === 0 ? 'lg:pt-12' : 'lg:pb-12 lg:mt-24'}`}
                >
                  <div className={`lg:absolute ${i % 2 === 0 ? 'lg:top-0' : 'lg:bottom-0'} lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 rounded-full bg-ap-surface-container-highest flex items-center justify-center border-4 border-ap-surface ring-2 ring-ap-primary mb-6 lg:mb-0`}>
                    <span className="text-ap-primary font-headline font-bold">{step.step}</span>
                  </div>
                  <div className="p-8 glass-panel rounded-xl border border-ap-outline-variant/10">
                    <h3 className="text-xl font-headline font-bold mb-4 text-ap-on-surface">{step.title}</h3>
                    <p className="text-sm text-ap-on-surface-variant leading-relaxed mb-6">{step.desc}</p>
                    <ul className="space-y-2 text-xs font-body text-ap-on-surface/70">
                      {step.tags.map((tag) => (
                        <li key={tag} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-ap-primary" />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="bg-ap-surface-container py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2 p-12 rounded-xl bg-ap-surface-container-high relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <Rocket className="w-24 h-24 text-ap-primary/20 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-6 text-ap-on-surface">Full-Support Lifecycle</h2>
              <p className="text-ap-on-surface-variant max-w-md mb-8 leading-relaxed">
                We don't just "hand over" code. Our partnership extends into post-launch stability, providing a dedicated US-based support team that knows your application's DNA.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-ap-primary">{lifecycle.monitoring}</span>
                  <span className="text-xs font-body uppercase tracking-widest text-ap-on-surface-variant">Monitoring</span>
                </div>
                <div className="w-px h-10 bg-ap-outline-variant/30 self-center" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-ap-primary">{lifecycle.sla}</span>
                  <span className="text-xs font-body uppercase tracking-widest text-ap-on-surface-variant">SLA Response</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="p-8 rounded-xl bg-ap-primary text-[#001f28] flex flex-col justify-end">
              <BadgeCheck className="w-10 h-10 mb-4" fill="currentColor" />
              <h3 className="text-2xl font-headline font-bold mb-2">Quality Oath</h3>
              <p className="text-sm font-medium leading-relaxed opacity-90">Every line of code is peer-reviewed by US leads before it ever reaches a staging environment.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="md:col-span-1 p-8 rounded-xl border border-ap-outline-variant/20 bg-ap-surface-container-lowest">
              <h4 className="font-headline font-bold mb-4 text-ap-on-surface">Agile Governance</h4>
              <p className="text-sm text-ap-on-surface-variant leading-relaxed">We utilize Jira, Slack, and Confluence to provide you with total visibility into our velocity and task backlog.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-2 flex flex-col md:flex-row gap-6">
              <div className="flex-1 p-8 rounded-xl bg-ap-surface-variant/40 border border-ap-outline-variant/10">
                <h4 className="font-headline font-bold mb-3 text-ap-on-surface">CI/CD Mastery</h4>
                <p className="text-sm text-ap-on-surface-variant">Automated pipelines ensure that every commit is tested and deployed with zero downtime.</p>
              </div>
              <div className="flex-1 p-8 rounded-xl bg-ap-surface-variant/40 border border-ap-outline-variant/10">
                <h4 className="font-headline font-bold mb-3 text-ap-on-surface">Tech Evolution</h4>
                <p className="text-sm text-ap-on-surface-variant">Quarterly technical reviews to ensure your stack remains modern and competitive.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 ethereal-glow -z-10 opacity-30" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-8 text-ap-on-surface">
            Ready to Build<br /><span className="text-ap-primary">Without Friction?</span>
          </h2>
          <p className="text-lg text-ap-on-surface-variant mb-12">Skip the offshore headaches. Experience the precision of an elite US-based engineering squad.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="hero-gradient-cta px-10 py-4 rounded-lg font-bold text-[#003543] hover:scale-105 transition-transform">Schedule Strategy Session</button>
            <button className="px-10 py-4 rounded-lg font-bold border border-ap-outline-variant/30 hover:bg-ap-surface-container-high transition-colors text-ap-on-surface">View Case Studies</button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Methodology;
