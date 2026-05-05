import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../data/mock';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ContactModal from './ContactModal';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-colors ${
        isDark
          ? 'bg-slate-900/60 shadow-2xl'
          : 'bg-white/70 shadow-[0px_12px_32px_rgba(25,28,30,0.06)]'
      }`} style={isDark ? { boxShadow: '0 20px 40px rgba(6, 14, 32, 0.4)' } : {}}>
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center transition-transform hover:scale-105">
            <img 
              src="/logo.png" 
              alt="ApZelio Logo" 
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 drop-shadow-md"
              style={{
                filter: isDark 
                  ? 'drop-shadow(0 0 8px rgba(71,214,255,0.4))' 
                  : 'drop-shadow(0 0 2px rgba(0,0,0,0.1))'
              }}
            />
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-headline tracking-tight text-sm transition-colors ${
                    isActive
                      ? isDark ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-[#006398] border-b-2 border-[#006398] pb-1 font-bold'
                      : isDark ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-[#006398]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-gray-100 text-slate-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA */}
            <button
              onClick={() => setContactOpen(true)}
              className={`hidden sm:block px-6 py-2 rounded-lg font-headline font-bold transition-all hover:scale-95 active:scale-90 duration-150 ${
                isDark
                  ? 'bg-gradient-to-br from-[#47d6ff] to-[#008cab] text-[#003543] shadow-lg'
                  : 'bg-gradient-to-br from-[#006398] to-[#40a2e7] text-white shadow-md'
              }`}
              style={isDark ? { boxShadow: '0 4px 20px rgba(71, 214, 255, 0.2)' } : { boxShadow: '0 4px 20px rgba(0, 99, 152, 0.2)' }}
            >
              Get Started
            </button>

            {/* Mobile Toggle */}
            <button
              className={`md:hidden transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden backdrop-blur-xl border-t ${
                isDark ? 'bg-[#060e20]/95 border-[#45464d]/10' : 'bg-white/95 border-gray-200'
              }`}
            >
              <div className="px-8 py-6 flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)}
                      className={`font-headline tracking-tight py-2 transition-colors ${
                        isActive ? (isDark ? 'text-cyan-400' : 'text-[#006398] font-bold') : (isDark ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-[#006398]')
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <button onClick={() => { setContactOpen(true); setMobileMenuOpen(false); }}
                  className={`px-6 py-3 rounded-lg font-headline font-bold mt-2 ${
                    isDark ? 'bg-gradient-to-br from-[#47d6ff] to-[#008cab] text-[#003543]' : 'bg-gradient-to-br from-[#006398] to-[#40a2e7] text-white'
                  }`}>
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Navbar;
