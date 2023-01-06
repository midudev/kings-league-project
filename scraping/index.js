import { writeDBFile } from '../db/index.js'
import { getURLTeams } from './url_teams.js'
import { scrapeAndSave, SCRAPINGS } from './utils.js'

for (const infoToScrape of Object.keys(SCRAPINGS)) {
	await scrapeAndSave(infoToScrape)
}

const teamsWithUrl = await getURLTeams()
await writeDBFile('teams', teamsWithUrl)
