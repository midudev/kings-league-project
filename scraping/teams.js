//import { scrape } from './utils'
import { cleanText, scrape } from './utils.js'

const base = 'https://kingsleague.pro/team/'
const URL_POSFIX = [
	'1k',
	'aniquiladores-fc',
	'pio-fc',
	'el-barrio',
	'xbuyer-team',
	'ultimate-mostoles',
	'los-troncos-fc',
	'rayo-barcelona',
	'jijantes-fc',
	'saiyans-fc',
	'porcinos-fc',
	'kunisports'
]
let teams = undefined
let data = []
URL_POSFIX.forEach(async (posfix) => {
	const $ = await scrape(base + posfix)
	const $list = $('ul.uk-slider-items li')
	teams = []
	$list.each((index, el) => {
		const name = cleanText($(el).find('h3').text())
		$(el).find('div.el-content span').text('')
		const role = $(el).find('div.el-content').text()
		teams.push({
			teamMember: name,
			role
		})
	})
	data.push({ [posfix]: teams })
	console.log(JSON.stringify(data, null, '  '))
})
