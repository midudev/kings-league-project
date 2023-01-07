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

export async function getSchedule($) {
	const schedule = []
	const $days = $(SELECTORS['match'])

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
			const localId = localImg.replace('/wp-content/uploads/2022/11/', '').replace('.svg', '')

			const visitantNameRaw = $($visitants[index]).text()
			const visitantName = cleanText(visitantNameRaw)
			const visitantImg = $($visitantsImages[index]).attr('src')
			const visitantId = visitantImg.replace('/wp-content/uploads/2022/11/', '').replace('.svg', '')

			matches.push({
				teams: [
					{ id: localId, name: localName },
					{ id: visitantId, name: visitantName }
				],
				score
			})
		})

		schedule.push({ date, matches })
	})

	return schedule
}
