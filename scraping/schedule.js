import { cleanText } from './utils.js'
import { writeDBFile } from '../db/index.js'
import puppeteer from 'puppeteer'

const BASE_URL = 'https://kingsleague.pro/calendario/'

const SELECTORS = {
	match: '#calendarMatch',
	date: '.el-table-title',
	locals: '.el-text-1',
	visitants: '.el-text-7',
	scores: '.el-text-4'
}

async function getTextFromElement(element, page) {
	return await page.evaluate((element) => element.textContent, element)
}

export async function getSchedule() {
	const schedule = []

	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(BASE_URL)
	await page.waitForSelector(SELECTORS['match'])

	// Each day
	const $matches = await page.$$(SELECTORS['match'])

	for await (const $match of $matches) {
		const day = []

		const $date = await $match.$(SELECTORS['date'])
		const dateRaw = await getTextFromElement($date, page)
		const date = cleanText(dateRaw)

		const $locals = await $match.$$(SELECTORS['locals'])
		const $visitants = await $match.$$(SELECTORS['visitants'])
		const $scores = await $match.$$(SELECTORS['scores'])

		// Each match of the day
		let matchIndex = 0

		for await (const $score of $scores) {
			const $currentScore = $score
			const $currentLocal = $locals[matchIndex]
			const $currentVisitant = $visitants[matchIndex]

			const scoreRaw = await getTextFromElement($currentScore, page)
			const score = cleanText(scoreRaw)
			const localRaw = await getTextFromElement($currentLocal, page)
			const local = cleanText(localRaw)
			const visitantRaw = await getTextFromElement($currentVisitant, page)
			const visitant = cleanText(visitantRaw)

			if (score.includes('–')) {
				day.push({ teams: [local, visitant], score })
			} else {
				day.push({ teams: [local, visitant], score: null })
			}

			matchIndex++
		}

		schedule.push({ date, matches: day })
	}

	await page.close()
	await browser.close()

	return schedule
}

const schedule = await getSchedule()
writeDBFile('schedule', schedule)
