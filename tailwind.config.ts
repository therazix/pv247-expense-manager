import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		},
		colors: {
			'dark-gunmetal': '#141332',
			'yankees-blue': '#1D1D41',
			'cool-grey': '#8C89B4',
			'go-green': '#02B15A',
			'lust': '#E41414',
			// Safelist colors
			'maya-blue': '#64CFF6',
			'majorelle-blue': '#6359E9'
		}
	},
	safelist: ['bg-maya-blue', 'text-maya-blue'],
	plugins: []
};
export default config;
