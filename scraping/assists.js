import { TEAMS } from '../db/index.js'
import { cleanText } from './utils.js'

const ASSISTS_SELECTORS = {
	teamName: { selector: '.fs-table-text_3', typeOf: 'string' },
	playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
	assists: { selector: '.fs-table-text_6', typeOf: 'number' }
}

export async function getAssistsList($) {
	const $rows = $('table tbody tr')

	const getImageFromTeam = ({ name }) => {
		const { image } = TEAMS.find((team) => team.name === name)
		return image
	}

	const assistsSelectorsEntries = Object.entries(ASSISTS_SELECTORS)
	const assistsList = []

	$rows.each((index, el) => {
		const $el = $(el)
		const playerEntries = assistsSelectorsEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $el.find(selector).text()
			const cleanedValue = cleanText(rawValue)
			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

			return [key, value]
		})

		const { teamName, ...playerData } = Object.fromEntries(playerEntries)
		const image = getImageFromTeam({ name: teamName })

		assistsList.push({
			...playerData,
			rank: index + 1,
			teamName,
			image
		})
	})

	return assistsList
}
