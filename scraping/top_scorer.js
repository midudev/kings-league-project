import { TEAMS } from '../db/index.js'
import { cleanText } from './utils.js'

const SCORES_SELECTORS = {
	ranking: { selector: '.fs-table-text_1', typeOf: 'string' },
	team: { selector: '.fs-table-text_3', typeOf: 'string' },
	playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
	goals: { selector: '.fs-table-text_6', typeOf: 'number' }
}

export async function getTopScoresList($) {
	const $rows = $('table tbody tr')

	const getImageFromTeam = ({ name }) => {
		const { image } = TEAMS.find((team) => team.name === name)
		return image
	}

	const scoresSelectorEntries = Object.entries(SCORES_SELECTORS)
	const topScorerList = []

	$rows.each((index, el) => {
		const topScorerEntries = scoresSelectorEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $(el).find(selector).text()
			const cleanedValue = cleanText(rawValue)

			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

			return [key, value]
		})

		const { team: teamName, ...scorerData } = Object.fromEntries(topScorerEntries)
		const image = getImageFromTeam({ name: teamName })

		topScorerList.push({
			...scorerData,
			rank: index + 1,
			team: teamName,
			image
		})
	})

	return topScorerList
}
