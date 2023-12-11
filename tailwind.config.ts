import type { Config } from 'tailwindcss';

import { selectableColors } from './src/constants/selectables';

const userSelectableColorsSafelist = Object.keys(selectableColors).map(
	color => `bg-${color} text-${color}`
);

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
			'maya-blue': '#64CFF6',
			'majorelle-blue': '#6359E9',
			'white': '#FFFFFF',
			'rose-red': '#C21858',
			'chocolate-cosmos': '#4d0c26',
			...selectableColors
		}
	},
	safelist: [
		'bg-maya-blue',
		'bg-dark-gunmetal',
		'text-maya-blue',
		'text-white',
		...userSelectableColorsSafelist
	],
	plugins: []
};
export default config;
