import { TEAMS } from '../db/index.js'
import { logInfo, logSuccess } from './log.js'
import { cleanText, scrape } from './utils.js'
import path from 'node:path'
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const STATICS_PATH = path.join(process.cwd(), './public/teams/')
const DB_PATH = path.join(process.cwd(), './db/')
const BASE_URL = 'https://kingsleague.pro/team'
const SELECTORS = {
	name: '.el-title',
	role: '.el-content',
	image: '.el-image'
}

async function getTeams() {
	const teams = []

	const saveImage = async ({ url, folder, fileName }) => {
		logInfo(`Fetching image for file name: ${fileName}`)
		const responseImage = await fetch(url)
		const arrayBuffer = await responseImage.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		logInfo(`Writing image to disk ${fileName}`)
		const imageFileNameClean = removeCharacters(fileName)
		const imageFileName = `${imageFileNameClean}.webp`
		const imageFilePath = path.join(STATICS_PATH, folder, imageFileName)
		await sharp(buffer).webp().toFile(imageFilePath)

		logInfo(`Everything is done! ${fileName}`)

		return imageFileName
	}

	const extractIdFromUrl = (url) => url.split('/').at(-1).split('.').at(0)

	const removeCharacters = (s) => {
		const withOutAccents = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		const regex = /[^a-zA-Z0-9.-]/g
		return withOutAccents.replace(regex, '')
	}

	const onlyLettersString = (s) => {
		const regex = /[^a-zA-Z ]/
		return s.replace(regex, '')
	}

	const convertStringToKebabCase = (s) => {
		const onlyLetters = onlyLettersString(s)
		const lowerCase = onlyLetters.toLowerCase()
		const rawWords = lowerCase.split(' ')
		const words = rawWords.filter((word) => word !== '')
		return words.join('-')
	}

	for (const team of TEAMS) {
		const { id: teamId, name } = team
		const players = []

		logInfo(`\tScraping team: ${name}`)
		const url = `${BASE_URL}/${teamId}`
		const $ = await scrape(url)
		const $lis = $('ul.uk-slider-items li')

		for (const el of $lis) {
			const $el = $(el)

			const nameRawValue = $el.find(SELECTORS.name).text()
			const name = cleanText(nameRawValue)

			// .el-content > "" + span
			// .el-content > p > "" + span
			const $role = $el.find(SELECTORS.role)
			const roleRawValue =
				$role.contents().length > 1
					? $role.contents().first().text()
					: $role.find('p').contents().first().text()
			const role = cleanText(roleRawValue)
			const roleLowerCase = role.toLowerCase()

			if (roleLowerCase !== 'presidente' && roleLowerCase !== 'entrenador') {
				const url = $el.find(SELECTORS.image).attr('src')
				const nameKebabCase = convertStringToKebabCase(name)
				const fileName = `${teamId}-${nameKebabCase}`
				const image = await saveImage({ url, folder: 'players', fileName })

				players.push({
					id: `${teamId}-${extractIdFromUrl(url)}`,
					name,
					role,
					image
				})
			} else if (roleLowerCase === 'entrenador') {
				const url = $el.find(SELECTORS.image).attr('src')
				const fileName = convertStringToKebabCase(name)
				const image = await saveImage({ url, folder: 'coaches', fileName })

				team.coachInfo = {
					name,
					image
				}
			}
		}

		teams.push({
			...team,
			players
		})

		logSuccess(`\tTeam: ${name} finished!\n`)
	}

	return teams
}

const teams = await getTeams()
await writeFile(`${DB_PATH}/teams.json`, JSON.stringify(teams, null, 2), 'utf-8')
