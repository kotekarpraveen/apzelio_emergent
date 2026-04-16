import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/mock';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/60 backdrop-blur-xl shadow-2xl" style={{ boxShadow: '0 20px 40px rgba(6, 14, 32, 0.4)' }}>
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-slate-50 font-headline hover:text-ap-primary transition-colors">
          ApZelio
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-headline tracking-tight text-sm transition-colors ${
                  isActive
                    ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block hero-gradient-cta px-6 py-2 rounded-lg font-headline font-bold text-[#003543] hover:scale-95 active:scale-90 transition-transform duration-150 shadow-lg" style={{ boxShadow: '0 4px 20px rgba(71, 214, 255, 0.2)' }}>
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ap-surface-container-lowest/95 backdrop-blur-xl border-t border-ap-outline-variant/10"
          >
            <div className="px-8 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-headline tracking-tight py-2 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button className="hero-gradient-cta px-6 py-3 rounded-lg font-headline font-bold text-[#003543] mt-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
