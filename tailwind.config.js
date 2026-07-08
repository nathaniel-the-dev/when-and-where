import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Lato', ...fontFamily.sans],
			},
			colors: {
				brand: {
					50: '#eef2ff',
					100: '#e0e7ff',
					200: '#c7d2fe',
					300: '#a5b4fc',
					400: '#818cf8',
					500: '#6366f1',
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
				},
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				pulseSoft: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1rem',
				lg: '2rem',
				xl: '2.5rem',
				'2xl': '4rem',
			},
		},
	},
	plugins: [],
};
