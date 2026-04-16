import React from 'react';
import { Link } from 'react-router-dom';
import { footerData } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-slate-950 w-full py-12 px-8 border-t border-ap-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div>
          <Link to="/" className="text-xl font-bold text-slate-100 font-headline mb-4 block">
            {footerData.brand}
          </Link>
          <p className="text-slate-500 font-body leading-relaxed max-w-xs">
            {footerData.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-body text-sm uppercase tracking-widest text-cyan-500 font-bold">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2">
            {footerData.quickLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-cyan-300 transition-colors uppercase tracking-widest text-xs font-bold"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-body text-sm uppercase tracking-widest text-cyan-500 font-bold">
            Connect
          </h4>
          <div className="flex gap-6">
            {footerData.social.map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-cyan-300 transition-colors uppercase tracking-widest text-xs font-bold"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-ap-outline-variant/5 text-center">
        <p className="font-body text-sm uppercase tracking-widest text-slate-500">
          {footerData.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
