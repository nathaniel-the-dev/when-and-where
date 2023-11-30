import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Lato', ...fontFamily.sans],
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
