import { cleanText } from './utils.js'

const SELECTORS = {
	match: '#calendarMatch',
	date: '.el-table-title',
	hour: '.fs-table-text_4',
	locals: '.el-text-1',
	localsImages: '.fs-table-text_3 img',
	visitants: '.el-text-7',
	visitantsImages: '.fs-table-text_5 img',
	scores: '.fs-table-text_8'
}

const MONTHS = {
	ENERO: 1,
	FEBRERO: 2,
	MARZO: 3,
	ABRIL: 4,
	MAYO: 5,
	JUNIO: 6,
	JULIO: 7,
	AGOSTO: 8,
	SEPTIEMBRE: 9,
	OCTUBRE: 10,
	NOVIEMBRE: 11,
	DICIEMBRE: 12
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
	'los-troncos': 'TFC'
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

		const [dayNumber, textMonth, yearNumber] = date.split(' de ')
		const monthNumber = MONTHS[textMonth.toUpperCase()]
		const prefixDate = `${yearNumber}-${monthNumber}-${dayNumber}`

		const $locals = $day.find(SELECTORS.locals)
		const $localsImages = $day.find(SELECTORS.localsImages)
		const $visitants = $day.find(SELECTORS.visitants)
		const $visitantsImages = $day.find(SELECTORS.visitantsImages)
		const $results = $day.find(SELECTORS.scores)
		const $hours = $day.find(SELECTORS.hour)

		$results.each((index, result) => {
			const scoreRaw = $(result).text()
			const score = cleanText(scoreRaw)

			const hourRaw = $($hours[index]).text()
			const hour = hourRaw.replace(/\t|\n|\s:/g, '').trim()

			const matchDate = new Date(`${prefixDate} ${hour} GMT+2`)

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

			const timestamp = hour === 'vs' ? null : matchDate.getTime()

			matches.push({
				timestamp,
				hour: hour === 'vs' ? null : hour,
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
