import { PRESIDENTS, TEAMS } from '../db/index.js'
import { cleanText } from './utils.js'

const LEADERBOARD_SELECTORS = {
	team: { selector: '.fs-table-text_3', typeOf: 'string' },
	wins: { selector: '.fs-table-text_4', typeOf: 'number' },
	losses: { selector: '.fs-table-text_5', typeOf: 'number' },
	scoredGoals: { selector: '.fs-table-text_6', typeOf: 'number' },
	concededGoals: { selector: '.fs-table-text_7', typeOf: 'number' },
	yellowCards: { selector: '.fs-table-text_8', typeOf: 'number' },
	redCards: { selector: '.fs-table-text_9', typeOf: 'number' }
}

export async function getLeaderBoard($) {
	const $rows = $('table tbody tr')

	const getTeamFrom = ({ name }) => {
		const { presidentId, ...restOfTeam } = TEAMS.find((team) => team.name === name)
		const president = PRESIDENTS.find((president) => president.id === presidentId)
		return { ...restOfTeam, president }
	}

	const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

	const leaderboard = []

	$rows.each((index, el) => {
		const $el = $(el)
		const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $el.find(selector).text()
			const cleanedValue = cleanText(rawValue)

			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

			return [key, value]
		})

		const { team: teamName, ...leaderboardForTeam } = Object.fromEntries(leaderBoardEntries)
		const team = getTeamFrom({ name: teamName })

		leaderboard.push({
			...leaderboardForTeam,
			team,
			rank: index + 1
		})
	})

	return leaderboard
}
