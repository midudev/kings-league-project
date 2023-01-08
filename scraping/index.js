import { writeDBFile } from '../db/index.js'
import { logInfo } from './log.js'
import { getShortNameTeams } from './short_name_teams.js'
import { getURLTeams } from './url_teams.js'
import { scrapeAndSave, SCRAPINGS } from './utils.js'

// get first parameter from command line
const scrapeParameter = process.argv.at(-1)

if (SCRAPINGS[scrapeParameter]) {
	await scrapeAndSave(scrapeParameter)
} else {
	logInfo('Scraping all data...')

	for (const infoToScrape of Object.keys(SCRAPINGS)) {
		await scrapeAndSave(infoToScrape)
	}

	const teamsWithUrl = await getURLTeams()
	await writeDBFile('teams', teamsWithUrl)

	// Update file of teams.json with short name of each team
	await writeDBFile('teams', getShortNameTeams())
}
