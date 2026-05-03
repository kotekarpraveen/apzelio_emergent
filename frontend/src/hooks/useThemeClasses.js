import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

/* -------- Dark palette -------- */
const DARK = {
  bgSurface: 'bg-[#0b1326]',
  bgSurfaceLow: 'bg-[#131b2e]',
  bgSurfaceContainer: 'bg-[#171f33]',
  bgSurfaceHigh: 'bg-[#222a3d]',
  bgSurfaceHighest: 'bg-[#2d3449]',
  bgSurfaceLowest: 'bg-[#060e20]',
  bgSurfaceBright: 'bg-[#31394d]',
  textOnSurface: 'text-[#dae2fd]',
  textOnSurfaceVariant: 'text-[#c6c6cd]',
  textPrimary: 'text-[#47d6ff]',
  textTertiary: 'text-[#d2bbff]',
  textSecondary: 'text-[#b9c7e0]',
  borderOutline: 'border-[#45464d]',
  borderOutlineLight: 'border-[#45464d]/10',
  primaryBg: 'bg-[#47d6ff]',
  primaryText: 'text-[#003543]',
  glassCard: 'bg-[#2d3449]/40 backdrop-blur-xl',
  glassPanel: 'bg-[#31394d]/60 backdrop-blur-xl',
  ctaGradient: 'bg-gradient-to-br from-[#47d6ff] to-[#008cab] text-[#003543]',
  ctaShadow: { boxShadow: '0 4px 30px rgba(71,214,255,0.3)' },
  secondaryContainer: 'bg-[#3c4a5e] text-[#abb9d2]',
  tertiaryContainer: 'bg-[#200050] text-[#965fff]',
  hoverBg: 'hover:bg-[#2d3449]',
  navBg: 'bg-slate-900/60',
  textGradient: 'bg-gradient-to-r from-[#47d6ff] to-[#008cab] bg-clip-text text-transparent',
  surfaceVariant: 'bg-[#2d3449]/40',
  primaryContainer: 'bg-[#001b23]',
  errorColor: 'text-[#ffb4ab]',
};

/* -------- Light palette -------- */
const LIGHT = {
  bgSurface: 'bg-[#f7f9fb]',
  bgSurfaceLow: 'bg-[#f2f4f6]',
  bgSurfaceContainer: 'bg-[#eceef0]',
  bgSurfaceHigh: 'bg-[#e6e8ea]',
  bgSurfaceHighest: 'bg-[#e0e3e5]',
  bgSurfaceLowest: 'bg-white',
  bgSurfaceBright: 'bg-[#f7f9fb]',
  textOnSurface: 'text-[#191c1e]',
  textOnSurfaceVariant: 'text-[#3e4850]',
  textPrimary: 'text-[#006398]',
  textTertiary: 'text-[#00668a]',
  textSecondary: 'text-[#565e74]',
  borderOutline: 'border-[#bec8d2]',
  borderOutlineLight: 'border-gray-200/50',
  primaryBg: 'bg-[#006398]',
  primaryText: 'text-white',
  glassCard: 'bg-white/80 backdrop-blur-xl shadow-sm',
  glassPanel: 'bg-white/90 backdrop-blur-xl shadow-md',
  ctaGradient: 'bg-gradient-to-br from-[#006398] to-[#40a2e7] text-white',
  ctaShadow: { boxShadow: '0 4px 30px rgba(0,99,152,0.2)' },
  secondaryContainer: 'bg-[#dae2fd] text-[#5c647a]',
  tertiaryContainer: 'bg-[#00a7e0] text-[#00384e]',
  hoverBg: 'hover:bg-[#e6e8ea]',
  navBg: 'bg-white/70',
  textGradient: 'bg-gradient-to-r from-[#006398] to-[#40a2e7] bg-clip-text text-transparent',
  surfaceVariant: 'bg-[#e0e3e5]/60',
  primaryContainer: 'bg-[#40a2e7]',
  errorColor: 'text-[#ba1a1a]',
};

export const useThemeClasses = () => {
  const { isDark } = useTheme();

  return useMemo(
    () => ({ isDark, ...(isDark ? DARK : LIGHT) }),
    [isDark]
  );
};
