/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		colors: {
  			'ap-surface': '#0b1326',
  			'ap-surface-dim': '#0b1326',
  			'ap-surface-container': '#171f33',
  			'ap-surface-container-high': '#222a3d',
  			'ap-surface-container-highest': '#2d3449',
  			'ap-surface-container-low': '#131b2e',
  			'ap-surface-container-lowest': '#060e20',
  			'ap-surface-bright': '#31394d',
  			'ap-surface-variant': '#2d3449',
  			'ap-primary': '#47d6ff',
  			'ap-primary-container': '#001b23',
  			'ap-on-primary': '#003543',
  			'ap-on-primary-container': '#008cab',
  			'ap-on-surface': '#dae2fd',
  			'ap-on-surface-variant': '#c6c6cd',
  			'ap-secondary': '#b9c7e0',
  			'ap-secondary-container': '#3c4a5e',
  			'ap-on-secondary-container': '#abb9d2',
  			'ap-tertiary': '#d2bbff',
  			'ap-tertiary-container': '#200050',
  			'ap-on-tertiary': '#3f008e',
  			'ap-on-tertiary-container': '#965fff',
  			'ap-outline': '#909097',
  			'ap-outline-variant': '#45464d',
  			'ap-error': '#ffb4ab',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			headline: ['Space Grotesk', 'sans-serif'],
  			body: ['Manrope', 'sans-serif'],
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			blob: {
  				'0%': { transform: 'translate(0px, 0px) scale(1)' },
  				'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
  				'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
  				'100%': { transform: 'translate(0px, 0px) scale(1)' },
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-20px)' },
  			},
  			fadeUp: {
  				'0%': { opacity: '0', transform: 'translateY(20px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			spinSlow: {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' },
  			},
  			spinSlowReverse: {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(-360deg)' },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'blob': 'blob 7s infinite',
  			'float': 'float 6s ease-in-out infinite',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'fade-up': 'fadeUp 0.8s ease-out forwards',
  			'spin-slow': 'spinSlow 10s linear infinite',
  			'spin-slow-reverse': 'spinSlowReverse 15s linear infinite',
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
};