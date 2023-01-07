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

const shortNames = {
	'rayo-barcelona': 'RDB',
	'1k': '1K',
	kunisports: 'KNS',
	jijantes: 'JFC',
	'el-barrio': 'ELB',
	pio: 'PIO',
	xbuyer: 'XBU',
	aniquiladores: 'ANI',
	'ultimate-mostoles': 'ULT',
	'saiyans-fc': 'SAI',
	'porcinos-fc': 'POR',
	'los-troncos': 'TFC',
	kunisports: 'KNS'
}

export async function getSchedule($) {
	const schedule = []
	const $days = $(SELECTORS.match)

	const getTeamIdFromImageUrl = (url) => {
		return url.slice(url.lastIndexOf('/') + 1).replace(/.(png|svg)/, '')
	}

	$days.each((_, day) => {
		const matches = []
		const $day = $(day)

		const dateRaw = $day.find(SELECTORS.date).text()
		const date = cleanText(dateRaw)

		const $locals = $day.find(SELECTORS.locals)
		const $localsImages = $day.find(SELECTORS.localsImages)
		const $visitants = $day.find(SELECTORS.visitants)
		const $visitantsImages = $day.find(SELECTORS.visitantsImages)
		const $results = $day.find(SELECTORS.scores)

		$results.each((index, result) => {
			const scoreRaw = $(result).text()
			const score = cleanText(scoreRaw)

			const localNameRaw = $($locals[index]).text()
			const localName = cleanText(localNameRaw)
			const localImg = $($localsImages[index]).attr('src')
			let localId = getTeamIdFromImageUrl(localImg)
			localId = MAPS[localId] || localId
			const localShortName = shortNames[localId]

			const visitantNameRaw = $($visitants[index]).text()
			const visitantName = cleanText(visitantNameRaw)
			const visitantImg = $($visitantsImages[index]).attr('src')
			let visitantId = getTeamIdFromImageUrl(visitantImg)
			visitantId = MAPS[visitantId] || visitantId
			const visitantShortName = shortNames[visitantId]

			matches.push({
				teams: [
					{ id: localId, name: localName, shortName: localShortName },
					{ id: visitantId, name: visitantName, shortName: visitantShortName }
				],
				score
			})
		})

		schedule.push({ date, matches })
	})

	return schedule
}
