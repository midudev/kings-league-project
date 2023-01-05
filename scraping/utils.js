import * as cheerio from 'cheerio'

import { getLeaderBoard } from './leaderboard.js'
import { getMvpList } from './mvp.js'
import { getTopScoresList } from './top_scorer.js'
import { logError, logInfo, logSuccess } from './log.js'
import { writeDBFile } from '../db/index.js'

export const SCRAPINGS = {
	leaderboard: {
		url: 'https://kingsleague.pro/estadisticas/clasificacion/',
		scraper: getLeaderBoard
	},
	mvp: {
		url: 'https://kingsleague.pro/estadisticas/mvp/',
		scraper: getMvpList
	},
	scores: {
		url: 'https://kingsleague.pro/estadisticas/goles/',
		scraper: getTopScoresList
	}
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

export async function scrapeAndSave(name) {
	const start = performance.now()

	try {
		const { scraper, url } = SCRAPINGS[name]

		logInfo(`Scraping [${name}]...`)
		const $ = await scrape(url)
		const content = await scraper($)
		logSuccess(`[${name}] scraped successfully`)

		logInfo(`Writing [${name}] to database...`)
		await writeDBFile(name, content)
		logSuccess(`[${name}] written successfully`)
	} catch (e) {
		logError(`Error scraping [${name}]`)
		logError(e)
	} finally {
		const end = performance.now()
		const time = (end - start) / 1000
		logInfo(`[${name}] scraped in ${time} seconds`)
	}
}
