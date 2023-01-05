import { writeDBFile, TEAMS } from '../db/index.js'
import { URLS, scrape } from './utils.js'


async function getMvpList() {
  const $ = await scrape(URLS.mvp)
  const $rows = $('table tbody tr')

  const MVP_SELECTORS = {
		rank: { selector: '.fs-table-text_1', typeOf: 'number' },
    team: { selector: '.fs-table-text_3', typeOf: 'string' },
    playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
    gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
    mvps: { selector: '.fs-table-text_6', typeOf: 'number' },
  }

	const getImageFromTeam = ({ name }) => {
    const { image } = TEAMS.find(
      (team) => team.name === name
    )
    return image
  }

  const cleanText = (text) =>
    text
      .replace(/\t|\n|\s:/g, '')
      .replace(/.*:/g, ' ')
      .trim()

  const mvpSelectorEntries = Object.entries(MVP_SELECTORS)
	const mvpList = []
  $rows.each((_, el) => {
    const mvpEntries = mvpSelectorEntries.map(
      ([key, { selector, typeOf }]) => {
        const rawValue = $(el).find(selector).text()
        const cleanedValue = cleanText(rawValue)

        const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

        return [key, value]
      }
    )
	const { team: teamName, ...mvpData } =
		Object.fromEntries(mvpEntries)
	const image = getImageFromTeam({ name: teamName })

	mvpList.push({
		...mvpData,
		team: teamName,
		image
	})
		//mvpList.push(Object.fromEntries(mvpEntries))
})
  return mvpList
}

const mvpList = await getMvpList()
await writeDBFile('mvpList', mvpList)
