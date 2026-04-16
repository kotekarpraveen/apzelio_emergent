import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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

const ContactModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service_interest: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); setForm({ name: '', email: '', company: '', phone: '', service_interest: '', message: '' }); }, 3000);
    } catch {
      setError('Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  const inputClass = isDark
    ? 'bg-[#0b1326] border-[#45464d]/30 text-[#dae2fd] placeholder-[#c6c6cd]/50 focus:border-[#47d6ff] focus:ring-[#47d6ff]/20'
    : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#006398] focus:ring-[#006398]/20';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`relative w-full max-w-lg rounded-2xl shadow-2xl border p-8 max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-[#171f33] border-[#45464d]/20' : 'bg-white border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-white/10 text-[#c6c6cd]' : 'hover:bg-gray-100 text-gray-500'
            }`}>
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-[#47d6ff]' : 'text-green-500'}`} />
                <h3 className={`text-2xl font-headline font-bold mb-2 ${isDark ? 'text-[#dae2fd]' : 'text-gray-900'}`}>Thank You!</h3>
                <p className={isDark ? 'text-[#c6c6cd]' : 'text-gray-600'}>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className={`text-2xl font-headline font-bold mb-2 ${isDark ? 'text-[#dae2fd]' : 'text-gray-900'}`}>Get in Touch</h2>
                <p className={`text-sm mb-6 ${isDark ? 'text-[#c6c6cd]' : 'text-gray-500'}`}>Tell us about your project and we'll schedule a strategy session.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#c6c6cd]' : 'text-gray-600'}`}>Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
                    </div>
                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#c6c6cd]' : 'text-gray-600'}`}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#c6c6cd]' : 'text-gray-600'}`}>Company</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc" className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
                    </div>
                    <div>
                      <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#c6c6cd]' : 'text-gray-600'}`}>Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`} />
                    </div>
                  </div>
                  <div>
                    <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#c6c6cd]' : 'text-gray-600'}`}>Service Interest</label>
                    <select name="service_interest" value={form.service_interest} onChange={handleChange} className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 ${inputClass}`}>
                      <option value="">Select a service...</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#c6c6cd]' : 'text-gray-600'}`}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your project..." className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 resize-none ${inputClass}`} />
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-headline font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-[#47d6ff] to-[#008cab] text-[#003543] hover:shadow-[0_0_20px_rgba(71,214,255,0.3)]'
                      : 'bg-gradient-to-r from-[#006398] to-[#40a2e7] text-white hover:shadow-[0_0_20px_rgba(0,99,152,0.3)]'
                  }`}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? 'Submitting...' : 'Send Enquiry'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
