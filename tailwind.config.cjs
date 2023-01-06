/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Archivo', 'system-ui', 'sans-serif'],
				black: ['Archivo Black', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
}
