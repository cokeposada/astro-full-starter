/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		fontFamily: {
			heading: ["Geist Sans", "sans-serif"],
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: "#0A0A0A",
			white: {
				DEFAULT: "#FFFFE3",
				30: "rgba(255, 255, 227, 0.3)",
				50: "rgba(255, 255, 227, 0.5)",
			},
			green: "#DAFF3E",
			pink: "#F28BD4",
		},
		container: {
			center: true,
		},
		fluidTypography: {
			remSize: 16,
			minScreenSize: 320,
			maxScreenSize: 1920,
			minTypeScale: 1.2,
			maxTypeScale: 1.333,
			lineHeight: 1.1
		}
	},
	plugins: [require("tailwind-fluid-typography")],
}
