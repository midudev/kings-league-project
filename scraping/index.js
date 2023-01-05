import { scrapeAndSave, SCRAPINGS } from './utils.js'

for (const infoToScrape of Object.keys(SCRAPINGS)) {
	await scrapeAndSave(infoToScrape)
}
