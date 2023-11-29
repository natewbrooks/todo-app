/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				xs: '548px',
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite',
				'juke-out-in': 'jukeOutIn 1.5s ease-in-out',
				'juke-in-out': 'jukeInOut 2s ease-in-out',
			},
			transitionProperty: {
				height: 'height',
			},
			keyframes: {
				jukeOutIn: {
					'0%': { transform: 'translate(0px, 0px)', maxWidth: '5rem', opacity: '100%' },
					'10%': { transform: 'translate(-12px, 0px)', opacity: '100%' },
					'30%': { transform: 'translate(130px, 0px)', maxWidth: '0rem', opacity: '0%' },
					'50%': { transform: 'translate(180px, 0px)', opacity: '0%' },
					'60%': { transform: 'translate(180px, 0px)' },
					'70%': { maxWidth: '0rem' },
					'100%': {
						transform: 'translate(180px, 0px)',
						maxWidth: '0rem',
						opacity: '0%',
						position: 'absolute',
					},
				},
				jukeInOut: {
					'0%': { transform: 'translate(50px, 0px)', maxWidth: '0.25rem', opacity: '0%' },
					'30%': { transform: 'translate(50px, 0px)', opacity: '0%' },
					'50%': { transform: 'translate(-12px, 0px)', maxWidth: '0.5rem', opacity: '100%' },
					'60%': { transform: 'translate(0px, 0px)', maxWidth: '3rem' },
					'70%': { maxWidth: '3.75rem' },
					'100%': { transform: 'translate(0px, 0px)', maxWidth: '5rem', opacity: '100%' },
				},
			},
		},
	},
	plugins: [],
};
