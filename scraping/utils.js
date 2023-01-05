import * as cheerio from 'cheerio'
const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/',
	mvp: 'https://kingsleague.pro/estadisticas/mvp/'
}

async function scrape(url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

export {URLS, scrape}