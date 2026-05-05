import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import axios from 'axios';

// API endpoint is now handled via axios.defaults.baseURL in App.js

const serviceOptions = [
  'AI Integration & LLM Ops',
  'Cloud Native Architecture',
  'Custom SaaS Development',
  'Security Audits',
  'Rapid MVP & Growth',
  'Scale-Up Infrastructure',
  'Enterprise Digital Excellence',
  'Other',
];

const INITIAL_FORM = { name: '', email: '', company: '', phone: '', service_interest: '', message: '' };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

/* ---------- Custom Hook ---------- */

const useContactForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`/api/contact`, form);
      setSuccess(true);
      setForm(INITIAL_FORM);
    } catch {
      setError('Failed to submit. Please try again.');
    }
    setLoading(false);
  }, [form]);

  return { form, loading, success, error, setSuccess, handleChange, handleSubmit };
};

/* ---------- Sub-components ---------- */

const ContactInfo = ({ t }) => {
  const items = [
    { icon: Mail, label: 'Email', value: 'hello@apzelio.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 0199-200' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA — US-Based' },
  ];

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <motion.div key={item.label} variants={fadeUp} className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/10'}`}>
            <item.icon className={`w-5 h-5 ${t.textPrimary}`} />
          </div>
          <div>
            <div className={`text-xs uppercase tracking-widest font-bold ${t.textOnSurfaceVariant}`}>{item.label}</div>
            <div className={`font-headline font-bold ${t.textOnSurface}`}>{item.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ContactFormFields = ({ t, form, handleChange, handleSubmit, loading, error }) => {
  const inputClass = t.isDark
    ? 'bg-[#0b1326] border-[#45464d]/30 text-[#dae2fd] placeholder-[#c6c6cd]/50 focus:border-[#47d6ff] focus:ring-[#47d6ff]/20'
    : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#006398] focus:ring-[#006398]/20';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className={`text-2xl font-headline font-bold mb-1 ${t.textOnSurface}`}>Send an Enquiry</h2>
      <p className={`text-sm mb-4 ${t.textOnSurfaceVariant}`}>Fields marked with * are required.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${t.textOnSurfaceVariant}`}>Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
        </div>
        <div>
          <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${t.textOnSurfaceVariant}`}>Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${t.textOnSurfaceVariant}`}>Company</label>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc" className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
        </div>
        <div>
          <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${t.textOnSurfaceVariant}`}>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
        </div>
      </div>
      <div>
        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${t.textOnSurfaceVariant}`}>Service Interest</label>
        <select name="service_interest" value={form.service_interest} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`}>
          <option value="">Select a service...</option>
          {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${t.textOnSurfaceVariant}`}>Message *</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your project requirements..." className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all focus:ring-2 resize-none ${inputClass}`} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className={`w-full py-3.5 rounded-lg font-headline font-bold text-sm flex items-center justify-center gap-2 transition-all ${t.ctaGradient}`} style={t.ctaShadow}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'Submitting...' : 'Send Enquiry'}
      </button>
    </form>
  );
};

/* ---------- Main Component ---------- */

const Contact = () => {
  const t = useThemeClasses();
  const { form, loading, success, error, setSuccess, handleChange, handleSubmit } = useContactForm();

  return (
    <main className={`pt-32 pb-24 px-8 ${t.bgSurface}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className={`text-sm tracking-[0.2em] uppercase mb-4 block font-bold ${t.textPrimary}`}>Contact Us</span>
            <h1 className={`text-5xl md:text-6xl font-headline font-bold tracking-tighter mb-8 ${t.textOnSurface}`}>
              Let's Build<br /><span className={t.textGradient}>Something Great.</span>
            </h1>
            <p className={`text-lg leading-relaxed mb-12 max-w-lg ${t.textOnSurfaceVariant}`}>
              Whether you need a rapid MVP, AI-powered infrastructure, or full-scale enterprise architecture — we're ready to help.
            </p>
            <ContactInfo t={t} />
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}>
            <div className={`rounded-2xl p-8 border ${t.isDark ? 'bg-[#171f33] border-[#45464d]/20' : 'bg-white border-gray-200 shadow-lg'}`}>
              {success ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16">
                  <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${t.isDark ? 'text-[#47d6ff]' : 'text-green-500'}`} />
                  <h3 className={`text-2xl font-headline font-bold mb-2 ${t.textOnSurface}`}>Thank You!</h3>
                  <p className={t.textOnSurfaceVariant}>Your enquiry has been received. We'll respond within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className={`mt-6 px-6 py-2 rounded-lg font-bold text-sm ${t.ctaGradient}`}>Send Another</button>
                </motion.div>
              ) : (
                <ContactFormFields t={t} form={form} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} error={error} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
