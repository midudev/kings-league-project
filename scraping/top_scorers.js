import { getImageFromTeam } from '../db/index.js'
import { cleanText } from './utils.js'

const SCORERS_SELECTORS = {
	team: { selector: '.fs-table-text_3', typeOf: 'string' },
	playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
	goals: { selector: '.fs-table-text_6', typeOf: 'number' }
}

export async function getTopScorersList($) {
	const $rows = $('table tbody tr')

	const scorersSelectorEntries = Object.entries(SCORERS_SELECTORS)
	const topScorersList = []

	$rows.each((index, el) => {
		const $el = $(el)
		const topScorersEntries = scorersSelectorEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $el.find(selector).text()
			const cleanedValue = cleanText(rawValue)

			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

			return [key, value]
		})

		const { team: teamName, ...scorersData } = Object.fromEntries(topScorersEntries)
		const image = getImageFromTeam({ name: teamName })

		topScorersList.push({
			rank: index + 1,
			...scorersData,
			team: teamName,
			image
		})
	})

	return topScorersList
}
