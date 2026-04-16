import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Quote } from 'lucide-react';
import { testimonialsData } from '../data/mock';
import { useThemeClasses } from '../hooks/useThemeClasses';
import ContactModal from '../components/ContactModal';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const Testimonials = () => {
  const { hero, testimonials, metric, logos } = testimonialsData;
  const t = useThemeClasses();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className={`pt-32 pb-24 overflow-hidden ${t.bgSurface}`}>
      <section className="max-w-7xl mx-auto px-8 mb-24 relative">
        <div className={`absolute -top-48 -right-24 w-96 h-96 rounded-full blur-[120px] ${t.isDark ? 'bg-[#d2bbff]/10' : 'bg-[#40a2e7]/10'}`} />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.08em] uppercase mb-6 ${t.secondaryContainer}`}>{hero.badge}</span>
          <h1 className={`font-headline text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-8 leading-tight ${t.textOnSurface}`}>
            {hero.title} <span className={t.textPrimary}>{hero.titleHighlight}</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${t.textOnSurfaceVariant}`}>{hero.description}</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`md:col-span-8 rounded-xl p-8 md:p-12 border relative overflow-hidden group ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/15' : 'border-gray-200'}`}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Quote className="w-20 h-20" /></div>
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <div className={`flex gap-1 mb-8 ${t.textPrimary}`}>{Array.from({ length: testimonials[0].rating }).map((_, i) => (<Star key={i} className="w-5 h-5" fill="currentColor" />))}</div>
                <blockquote className={`font-headline text-2xl md:text-3xl font-medium leading-snug mb-10 ${t.textOnSurface}`}>
                  {testimonials[0].quote.split(testimonials[0].highlightWord).map((part, i, arr) => (
                    <React.Fragment key={i}>{part}{i < arr.length - 1 && <span className={t.textPrimary}>{testimonials[0].highlightWord}</span>}</React.Fragment>
                  ))}
                </blockquote>
              </div>
              <div className="flex items-center gap-4">
                <img className={`w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all border-2 ${t.isDark ? 'border-[#47d6ff]/20' : 'border-[#006398]/20'}`} src={testimonials[0].avatar} alt={testimonials[0].author} />
                <div>
                  <p className={`font-bold text-lg ${t.textOnSurface}`}>{testimonials[0].author}</p>
                  <p className={`text-sm ${t.textOnSurfaceVariant}`}>{testimonials[0].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className={`md:col-span-4 rounded-xl p-8 border flex flex-col justify-between ${t.bgSurfaceHighest} ${t.isDark ? 'border-[#45464d]/15' : 'border-gray-200'}`}>
            <div className="mb-6">
              <Zap className={`w-5 h-5 mb-4 ${t.textPrimary}`} fill="currentColor" />
              <p className={`italic leading-relaxed ${t.textOnSurface}`}>{testimonials[1].quote}</p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-10 h-10 rounded-full object-cover" src={testimonials[1].avatar} alt={testimonials[1].author} />
              <div>
                <p className={`font-bold text-sm ${t.textOnSurface}`}>{testimonials[1].author}</p>
                <p className={`text-[10px] uppercase tracking-wider ${t.textOnSurfaceVariant}`}>{testimonials[1].role}</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className={`md:col-span-4 rounded-xl p-8 border flex flex-col items-center justify-center text-center ${t.primaryContainer} ${t.isDark ? 'border-[#47d6ff]/10' : 'border-[#006398]/10'}`}>
            <p className={`text-5xl font-headline font-bold mb-2 ${t.textPrimary}`}>{metric.value}</p>
            <p className={`font-bold text-sm tracking-tight mb-4 ${t.isDark ? 'text-[#008cab]' : 'text-white'}`}>{metric.label}</p>
            <p className={`text-xs ${t.textOnSurfaceVariant}`}>{metric.sublabel}</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className={`md:col-span-8 rounded-xl p-8 md:p-10 border relative ${t.bgSurfaceLow} ${t.isDark ? 'border-[#45464d]/15' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className={`font-headline text-xl font-bold mb-4 ${t.textOnSurface}`}>{testimonials[2].title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${t.textOnSurfaceVariant}`}>{testimonials[2].quote}</p>
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover" src={testimonials[2].avatar} alt={testimonials[2].author} />
                  <div>
                    <p className={`font-bold text-sm ${t.textOnSurface}`}>{testimonials[2].author}</p>
                    <p className={`text-[10px] uppercase tracking-wider ${t.textOnSurfaceVariant}`}>{testimonials[2].role}</p>
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

      <section className="max-w-7xl mx-auto px-8 mb-32 text-center">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`text-xs font-bold uppercase tracking-[0.2em] mb-12 ${t.textOnSurfaceVariant}`}>Trusted by Global Infrastructure Leaders</motion.p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30">
          {logos.map((logo, i) => (<img key={i} className="h-6 md:h-8" src={logo} alt="Partner logo" />))}
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`rounded-3xl p-12 md:p-20 text-center border relative overflow-hidden ${t.bgSurfaceContainer} ${t.isDark ? 'border-[#45464d]/10' : 'border-gray-200'}`}>
          <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[80px] ${t.isDark ? 'bg-[#47d6ff]/5' : 'bg-[#006398]/5'}`} />
          <h2 className={`font-headline text-4xl md:text-5xl font-bold mb-6 relative z-10 ${t.textOnSurface}`}>Ready for your own success story?</h2>
          <p className={`text-lg max-w-xl mx-auto mb-10 relative z-10 ${t.textOnSurfaceVariant}`}>Let's build the infrastructure that will define your company's next decade.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 relative z-10">
            <button onClick={() => setContactOpen(true)} className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${t.ctaGradient}`} style={t.ctaShadow}>Schedule an Architecture Audit</button>
            <button onClick={() => window.location.href='/services'} className={`px-8 py-4 rounded-lg font-bold text-lg border transition-all ${t.bgSurfaceHigh} ${t.isDark ? 'border-[#45464d]/30 hover:bg-[#31394d] text-[#dae2fd]' : 'border-gray-200 hover:bg-[#e6e8ea] text-[#191c1e]'}`}>View Service Stack</button>
          </div>
        </motion.div>
      </section>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Testimonials;
