import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Quote, ArrowRight } from 'lucide-react';
import { testimonialsData } from '../data/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Testimonials = () => {
  const { hero, testimonials, metric, logos } = testimonialsData;

  return (
    <main className="pt-32 pb-24 overflow-hidden">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 mb-24 relative">
        <div className="absolute -top-48 -right-24 w-96 h-96 bg-ap-tertiary/10 rounded-full blur-[120px]" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-ap-secondary-container text-ap-on-secondary-container text-[10px] font-bold tracking-[0.08em] uppercase mb-6">{hero.badge}</span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-[-0.04em] text-ap-on-surface mb-8 leading-tight">
            {hero.title} <span className="text-ap-primary">{hero.titleHighlight}</span>
          </h1>
          <p className="text-ap-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">{hero.description}</p>
        </motion.div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Quote */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-8 bg-ap-surface-container-low rounded-xl p-8 md:p-12 border border-ap-outline-variant/15 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-20 h-20" />
            </div>
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="flex gap-1 text-ap-primary mb-8">
                  {Array.from({ length: testimonials[0].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5" fill="currentColor" />
                  ))}
                </div>
                <blockquote className="font-headline text-2xl md:text-3xl font-medium text-ap-on-surface leading-snug mb-10">
                  {testimonials[0].quote.split(testimonials[0].highlightWord).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-ap-primary">{testimonials[0].highlightWord}</span>}
                    </React.Fragment>
                  ))}
                </blockquote>
              </div>
              <div className="flex items-center gap-4">
                <img className="w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all border-2 border-ap-primary/20" src={testimonials[0].avatar} alt={testimonials[0].author} />
                <div>
                  <p className="font-bold text-ap-on-surface text-lg">{testimonials[0].author}</p>
                  <p className="text-ap-on-surface-variant text-sm">{testimonials[0].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small Quote */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="md:col-span-4 bg-ap-surface-container-highest rounded-xl p-8 border border-ap-outline-variant/15 flex flex-col justify-between">
            <div className="mb-6">
              <Zap className="w-5 h-5 text-ap-primary mb-4" fill="currentColor" />
              <p className="text-ap-on-surface italic leading-relaxed">{testimonials[1].quote}</p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-10 h-10 rounded-full object-cover" src={testimonials[1].avatar} alt={testimonials[1].author} />
              <div>
                <p className="font-bold text-sm text-ap-on-surface">{testimonials[1].author}</p>
                <p className="text-ap-on-surface-variant text-[10px] uppercase tracking-wider">{testimonials[1].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Metric Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="md:col-span-4 bg-ap-primary-container rounded-xl p-8 border border-ap-primary/10 flex flex-col items-center justify-center text-center">
            <p className="text-ap-primary text-5xl font-headline font-bold mb-2">{metric.value}</p>
            <p className="text-ap-on-primary-container font-bold text-sm tracking-tight mb-4">{metric.label}</p>
            <p className="text-ap-on-surface-variant text-xs">{metric.sublabel}</p>
          </motion.div>

          {/* Long Story */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-8 bg-ap-surface-container-low rounded-xl p-8 md:p-10 border border-ap-outline-variant/15 relative">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="font-headline text-xl font-bold text-ap-on-surface mb-4">{testimonials[2].title}</h3>
                <p className="text-ap-on-surface-variant text-sm leading-relaxed mb-6">{testimonials[2].quote}</p>
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover" src={testimonials[2].avatar} alt={testimonials[2].author} />
                  <div>
                    <p className="font-bold text-sm text-ap-on-surface">{testimonials[2].author}</p>
                    <p className="text-ap-on-surface-variant text-[10px] uppercase tracking-wider">{testimonials[2].role}</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden grayscale contrast-125 brightness-75">
                <img className="w-full h-full object-cover" src={testimonials[2].image} alt="Office" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="max-w-7xl mx-auto px-8 mb-32 text-center">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-ap-on-surface-variant text-xs font-bold uppercase tracking-[0.2em] mb-12">
          Trusted by Global Infrastructure Leaders
        </motion.p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30">
          {logos.map((logo, i) => (
            <img key={i} className="h-6 md:h-8" src={logo} alt="Partner logo" />
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-ap-surface-container rounded-3xl p-12 md:p-20 text-center border border-ap-outline-variant/10 relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-ap-primary/5 rounded-full blur-[80px]" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-ap-on-surface mb-6 relative z-10">Ready for your own success story?</h2>
          <p className="text-ap-on-surface-variant text-lg max-w-xl mx-auto mb-10 relative z-10">
            Let's build the infrastructure that will define your company's next decade.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 relative z-10">
            <button className="hero-gradient-cta text-[#003543] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_20px_rgba(71,214,255,0.3)] transition-all">
              Schedule an Architecture Audit
            </button>
            <button className="bg-ap-surface-container-high border border-ap-outline-variant/30 text-ap-on-surface px-8 py-4 rounded-lg font-bold text-lg hover:bg-ap-surface-bright transition-all">
              View Service Stack
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Testimonials;
