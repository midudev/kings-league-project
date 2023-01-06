/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontSize: {
				xxs: '.625rem'
			},
			fontFamily: {
				body: ['Archivo', 'system-ui', 'sans-serif'],
				title: ['Archivo Black', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
}
