import path from 'node:path'
import sharp from 'sharp'

import { TEAMS } from '../db/index.js'
import { logInfo, logError } from './log.js'
import { cleanText } from './utils.js'

const PLAYER_FOLDER_PATH = path.join(process.cwd(), './public/teams/players')

const PLAYER_SELECTORS = {
	firstName: { selector: '.fs-grid-meta-3', typeOf: 'string' },
	lastName: { selector: '.fs-grid-text-3', typeOf: 'string' },
	teamName: { selector: '.uk-text-lead', typeOf: 'string' },
	role: { selector: '.fs-grid-meta-1', typeOf: 'string' }
}

let counter = 1000

const extractIdFromUrl = (url) => url.split('/').at(-1).split('.').at(0)

const generateIdForPlayer = ({ teamId, image }) => {
	const imageId = extractIdFromUrl(image)
	const playerId = imageId === 'placeholder' ? counter++ : imageId
	return `${teamId}-${playerId}`
}

export async function getPlayersTwelve($) {
	const $rows = $('div.fs-load-more-item.fs-mw')

	const getTeamFrom = ({ name: teamName }) => TEAMS.find((team) => team.name === teamName)

	const playerSelectorEntries = Object.entries(PLAYER_SELECTORS)
	const players = []

	$rows.each((_, el) => {
		const playerEntries = playerSelectorEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $(el).find(selector).text()
			const cleanedValue = cleanText(rawValue)

			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

			return [key, value]
		})

		const { teamName, firstName, lastName, ...playerInfo } = Object.fromEntries(playerEntries)
		const name = `${firstName} ${lastName}`

		const team = getTeamFrom({ name: teamName })

		const image = $(el).find('.el-image.uk-invisible').attr('src')

		players.push({
			...playerInfo,
			firstName,
			lastName,
			image,
			name,
			id: generateIdForPlayer({ teamId: team.id, image }),
			team: {
				id: team.id,
				name: teamName,
				image: team.image,
				imageWhite: team.imageWhite
			}
		})
	})

	for (const player of players) {
		const imageURL = await saveImageWebp(player)
		player.image = imageURL
	}
	return players
}

async function saveImageWebp(player) {
	const { id, image } = player

	if (image.includes('placeholder.png')) {
		return 'placeholder.png'
	}

	try {
		logInfo(`Fetching image for file name: ${id}`)
		const res = await fetch(image)
		const imgArrayBuffer = await res.arrayBuffer()
		const buffer = Buffer.from(imgArrayBuffer)

		logInfo(`Writing image to disk: ${id}`)
		const imageFileName = `${id}.webp`
		const imageFilePath = path.join(PLAYER_FOLDER_PATH, imageFileName)
		await sharp(buffer).webp().toFile(imageFilePath)
		logInfo(`Everything is done! ${id}`)

		return imageFileName
	} catch (error) {
		logError(error)
	}

	return null
}
