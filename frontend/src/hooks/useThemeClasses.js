import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Theme-aware class helper
export const useThemeClasses = () => {
  const { isDark } = useTheme();
  return {
    isDark,
    // Backgrounds
    bgSurface: isDark ? 'bg-[#0b1326]' : 'bg-[#f7f9fb]',
    bgSurfaceLow: isDark ? 'bg-[#131b2e]' : 'bg-[#f2f4f6]',
    bgSurfaceContainer: isDark ? 'bg-[#171f33]' : 'bg-[#eceef0]',
    bgSurfaceHigh: isDark ? 'bg-[#222a3d]' : 'bg-[#e6e8ea]',
    bgSurfaceHighest: isDark ? 'bg-[#2d3449]' : 'bg-[#e0e3e5]',
    bgSurfaceLowest: isDark ? 'bg-[#060e20]' : 'bg-white',
    bgSurfaceBright: isDark ? 'bg-[#31394d]' : 'bg-[#f7f9fb]',
    // Text
    textOnSurface: isDark ? 'text-[#dae2fd]' : 'text-[#191c1e]',
    textOnSurfaceVariant: isDark ? 'text-[#c6c6cd]' : 'text-[#3e4850]',
    textPrimary: isDark ? 'text-[#47d6ff]' : 'text-[#006398]',
    textTertiary: isDark ? 'text-[#d2bbff]' : 'text-[#00668a]',
    textSecondary: isDark ? 'text-[#b9c7e0]' : 'text-[#565e74]',
    // Borders
    borderOutline: isDark ? 'border-[#45464d]' : 'border-[#bec8d2]',
    borderOutlineLight: isDark ? 'border-[#45464d]/10' : 'border-gray-200/50',
    // Accents
    primaryBg: isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]',
    primaryText: isDark ? 'text-[#003543]' : 'text-white',
    // Cards
    glassCard: isDark ? 'bg-[#2d3449]/40 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl shadow-sm',
    glassPanel: isDark ? 'bg-[#31394d]/60 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl shadow-md',
    // CTA gradient
    ctaGradient: isDark
      ? 'bg-gradient-to-br from-[#47d6ff] to-[#008cab] text-[#003543]'
      : 'bg-gradient-to-br from-[#006398] to-[#40a2e7] text-white',
    ctaShadow: isDark
      ? { boxShadow: '0 4px 30px rgba(71,214,255,0.3)' }
      : { boxShadow: '0 4px 30px rgba(0,99,152,0.2)' },
    // Secondary container
    secondaryContainer: isDark ? 'bg-[#3c4a5e] text-[#abb9d2]' : 'bg-[#dae2fd] text-[#5c647a]',
    // Tertiary container
    tertiaryContainer: isDark ? 'bg-[#200050] text-[#965fff]' : 'bg-[#00a7e0] text-[#00384e]',
    // Hover
    hoverBg: isDark ? 'hover:bg-[#2d3449]' : 'hover:bg-[#e6e8ea]',
    // Nav
    navBg: isDark ? 'bg-slate-900/60' : 'bg-white/70',
    // Text gradient
    textGradient: isDark
      ? 'bg-gradient-to-r from-[#47d6ff] to-[#008cab] bg-clip-text text-transparent'
      : 'bg-gradient-to-r from-[#006398] to-[#40a2e7] bg-clip-text text-transparent',
    // Surface variant
    surfaceVariant: isDark ? 'bg-[#2d3449]/40' : 'bg-[#e0e3e5]/60',
    // Primary container
    primaryContainer: isDark ? 'bg-[#001b23]' : 'bg-[#40a2e7]',
    // Error
    errorColor: isDark ? 'text-[#ffb4ab]' : 'text-[#ba1a1a]',
  };
};
