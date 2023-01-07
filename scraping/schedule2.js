import { cleanText } from './utils.js'

const SELECTORS = {
	match: '#calendarMatch',
	date: '.el-table-title',
	locals: '.el-text-1',
	visitants: '.el-text-7',
	scores: '.fs-table-text_8'
}

export async function getSchedule2($) {
	const schedule = []
	const $days = $(SELECTORS['match'])

	$days.each((_, day) => {
		const matches = []
		const $day = $(day)

		const dateRaw = $day.find(SELECTORS['date']).text()
		const date = cleanText(dateRaw)

		const $locals = $day.find(SELECTORS['locals'])
		const $visitants = $day.find(SELECTORS['visitants'])
		const $results = $day.find(SELECTORS['scores'])

		$results.each((index, result) => {
			const scoreRaw = $(result).text()
			const score = cleanText(scoreRaw)

			const localRaw = $($locals[index]).text()
			const local = cleanText(localRaw)

			const visitantRaw = $($visitants[index]).text()
			const visitant = cleanText(visitantRaw)

			matches.push({
				teams: [local, visitant],
				score
			})
		})

		schedule.push({ date, matches })
	})

	return schedule
}
