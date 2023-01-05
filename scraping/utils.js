import * as cheerio from 'cheerio'

export const URLS = {
	leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/',
	mvp: 'https://kingsleague.pro/estadisticas/mvp/'
}

export const cleanText = (text) =>
	text
		.replace(/\t|\n|\s:/g, '')
		.replace(/.*:/g, ' ')
		.trim()

export async function scrape(url) {
	const res = await fetch(url)
	const html = await res.text()
	return cheerio.load(html)
}
