import { cleanText } from './utils.js'

const SELECTORS = {
	match: '#calendarMatch',
	date: '.el-table-title',
	locals: '.el-text-1',
	localsImages: '.fs-table-text_3 img',
	visitants: '.el-text-7',
	visitantsImages: '.fs-table-text_5 img',
	scores: '.fs-table-text_8'
}

const MAPS = {
	'el-bbarrio': 'el-barrio',
	'jijantes-fc': 'jijantes',
	'xbuyer-team': 'xbuyer'
}

export async function getSchedule($) {
	const schedule = []
	const $days = $(SELECTORS['match'])

	const getTeamIdFromImageUrl = (url) => {
		return url.slice(url.lastIndexOf('/') + 1).replace(/.(png|svg)/, '')
	}

	$days.each((_, day) => {
		const matches = []
		const $day = $(day)

		const dateRaw = $day.find(SELECTORS['date']).text()
		const date = cleanText(dateRaw)

		const $locals = $day.find(SELECTORS['locals'])
		const $localsImages = $day.find(SELECTORS['localsImages'])
		const $visitants = $day.find(SELECTORS['visitants'])
		const $visitantsImages = $day.find(SELECTORS['visitantsImages'])
		const $results = $day.find(SELECTORS['scores'])

		$results.each((index, result) => {
			const scoreRaw = $(result).text()
			const score = cleanText(scoreRaw)

			const localNameRaw = $($locals[index]).text()
			const localName = cleanText(localNameRaw)
			const localImg = $($localsImages[index]).attr('src')
			const localId = getTeamIdFromImageUrl(localImg)

			const visitantNameRaw = $($visitants[index]).text()
			const visitantName = cleanText(visitantNameRaw)
			const visitantImg = $($visitantsImages[index]).attr('src')
			const visitantId = getTeamIdFromImageUrl(visitantImg)

			matches.push({
				teams: [
					{ id: MAPS[localId] || localId, name: localName },
					{ id: MAPS[visitantId] || visitantId, name: visitantName }
				],
				score
			})
		})

		schedule.push({ date, matches })
	})

	return schedule
}
