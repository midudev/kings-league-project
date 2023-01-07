import { getImageFromTeam } from '../db/index.js'
import { cleanText } from './utils.js'

const SCORES_SELECTORS = {
	team: { selector: '.fs-table-text_3', typeOf: 'string' },
	playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
	goals: { selector: '.fs-table-text_6', typeOf: 'number' }
}

export async function getTopScorersList($) {
	const $rows = $('table tbody tr')

	const scoresSelectorEntries = Object.entries(SCORES_SELECTORS)
	const topScorersList = []

	$rows.each((index, el) => {
		const $el = $(el)
		const topScorersEntries = scoresSelectorEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $el.find(selector).text()
			const cleanedValue = cleanText(rawValue)

			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

			return [key, value]
		})

		const { team: teamName, ...scorerData } = Object.fromEntries(topScorersEntries)
		const image = getImageFromTeam({ name: teamName })

		topScorersList.push({
			rank: index + 1,
			...scorerData,
			team: teamName,
			image
		})
	})

	return topScorersList
}
