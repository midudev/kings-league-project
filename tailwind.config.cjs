/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {

			colors: {
				principal: '#cd5500',
				'principal-dark': '#ff6900'

			},

			fontSize: {
				xxs: '.625rem'
			},
			fontFamily: {
				body: ['Archivo', 'system-ui', 'sans-serif'],
				title: ['Archivo Black', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'aniquiladores-fc':
					'linear-gradient(90deg, rgb(130, 31, 52) 0%, 12.9447%, rgb(153, 30, 56) 25.8893%, 62.9447%, rgb(243, 89, 117) 100%)',
				'1k': 'linear-gradient(90deg, rgb(61, 185, 202) 0%, 41.0433%, rgb(109, 106, 243) 82.0866%, 91.0433%, rgb(137, 100, 254) 100%)',
				'el-barrio':
					'linear-gradient(90deg, rgb(20, 32, 32) 0%, 44.7732%, rgb(59, 148, 143) 89.5464%, 94.7732%, rgb(75, 167, 162) 100%)',
				'jijantes-fc':
					'linear-gradient(90deg, rgb(210, 54, 73) 0%, 19.4539%, rgb(134, 41, 68) 38.9079%, 69.4539%, rgb(50, 56, 90) 100%)',
				kunisports:
					'linear-gradient(180deg, rgb(16, 25, 32) 0%, 32.9225%, rgb(100, 74, 85) 65.8451%, 82.9225%, rgb(169, 103, 117) 100%)',
				'los-troncos-fc':
					'linear-gradient(180deg, rgb(62, 100, 101) 0%, 7.34463%, rgb(49, 89, 91) 14.6893%, 57.3446%, rgb(45, 57, 57) 100%)',
				'pio-fc':
					'linear-gradient(225deg, rgb(254, 246, 139) 0%, 15.3153%, rgb(221, 211, 91) 30.6306%, 65.3153%, rgb(148, 138, 16) 100%)',
				'porcinos-fc':
					'linear-gradient(90deg, rgb(216, 25, 85) 0%, 14.4737%, rgb(225, 68, 121) 28.9474%, 64.4737%, rgb(238, 114, 161) 100%)',
				'rayo-barcelona':
					'linear-gradient(180deg, rgb(243, 176, 71) 0%, 31.4453%, rgb(199, 144, 59) 62.8906%, 81.4453%, rgb(173, 122, 42) 100%)',
				'saiyans-fc':
					'linear-gradient(225deg, rgb(28, 66, 207) 0%, 11.7232%, rgb(4, 38, 162) 23.4463%, 61.7232%, rgb(19, 26, 52) 100%)',
				'ultimate-mostoles':
					'linear-gradient(90deg, rgb(20, 20, 20) 0%, 0%, rgb(20, 20, 20) 0%, 50%, rgb(134, 134, 134) 100%)',
				'xbuyer-team':
					'linear-gradient(90deg, rgb(32, 32, 32) 0%, 15.1316%, rgb(81, 81, 81) 30.2632%, 65.1316%, rgb(132, 132, 132) 100%)'
			}
		}
	},
	safelist: [
		'bg-aniquiladores-fc',
		'bg-1k',
		'bg-el-barrio',
		'bg-jijantes-fc',
		'bg-kunisports',
		'bg-los-troncos-fc',
		'bg-pio-fc',
		'bg-porcinos-fc',
		'bg-rayo-barcelona',
		'bg-saiyans-fc',
		'bg-ultimate-mostoles',
		'bg-xbuyer-team'
	],
	plugins: []
}
