import React from 'react';
import { Link } from 'react-router-dom';
import { footerData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`w-full py-12 px-8 border-t transition-colors ${
      isDark ? 'bg-slate-950 border-[#45464d]/10' : 'bg-slate-50 border-gray-200'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div>
          <Link to="/" className="mb-4 block transition-transform hover:scale-105 origin-left w-fit">
            <img 
              src="/logo.png" 
              alt={footerData.brand} 
              className="h-14 w-auto object-contain transition-all duration-300 drop-shadow-sm"
              style={{
                filter: isDark 
                  ? 'drop-shadow(0 0 6px rgba(71,214,255,0.3))' 
                  : 'invert(1) hue-rotate(180deg) brightness(0.7) contrast(1.5)'
              }}
            />
          </Link>
          <p className={`font-body leading-relaxed max-w-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            {footerData.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className={`font-body text-sm uppercase tracking-widest font-bold ${isDark ? 'text-cyan-500' : 'text-[#006398]'}`}>Quick Links</h4>
          <div className="flex flex-col gap-2">
            {footerData.quickLinks.map((link) => (
              <a key={link} href="#" className={`uppercase tracking-widest text-xs font-bold transition-colors ${
                isDark ? 'text-slate-500 hover:text-cyan-300' : 'text-slate-500 hover:text-[#006398]'
              }`}>{link}</a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className={`font-body text-sm uppercase tracking-widest font-bold ${isDark ? 'text-cyan-500' : 'text-[#006398]'}`}>Connect</h4>
          <div className="flex gap-6">
            {footerData.social.map((link) => (
              <a key={link} href="#" className={`uppercase tracking-widest text-xs font-bold transition-colors ${
                isDark ? 'text-slate-500 hover:text-cyan-300' : 'text-slate-500 hover:text-[#006398]'
              }`}>{link}</a>
            ))}
          </div>
        </div>
      </div>
      <div className={`max-w-7xl mx-auto mt-12 pt-8 border-t text-center ${isDark ? 'border-[#45464d]/5' : 'border-gray-200'}`}>
        <p className={`font-body text-sm uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {footerData.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
