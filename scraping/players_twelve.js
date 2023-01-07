import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { TEAMS } from '../db/index.js'
import { cleanText } from './utils.js'

const PLAYER_FOLDER_PATH = path.join(process.cwd(), './assets/static/players')

const PLAYER_SELECTORS = {
	firstName: { selector: '.el-title', typeOf: 'string' },
	lastName: { selector: '.el-meta', typeOf: 'string' },
	teamName: { selector: '.uk-text-lead', typeOf: 'string' },
	role: { selector: '.fs-grid-meta', typeOf: 'string' }
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
		const imageURL = await saveImageBase64(player)
		player.image = imageURL
	}

	return players
}

async function saveImageBase64(player) {
	const { firstName, lastName, team, image } = player

	if (image.includes('placeholder.png')) {
		return 'placeholder.png'
	}

	let playerImage = null
	try {
		const res = await fetch(image)
		const extension = res.headers.get('content-type').replace(/image\//, '')

		const imgArrayBuffer = await res.arrayBuffer()
		const imageBase64 = Buffer.from(imgArrayBuffer).toString('base64')

		const imageName = lastName
			? `${team.id}-${firstName.toLowerCase()}-${lastName.toLowerCase()}.${extension}`
			: `${team.id}-${firstName.toLowerCase()}.${extension}`

		const normalizedImageName = imageName
			.normalize('NFD')
			.replace(/\s+/g, '-')
			.replace(/[\u0300-\u036f]/g, '')

		await writeFile(`${PLAYER_FOLDER_PATH}/${normalizedImageName}`, imageBase64, 'base64')

		playerImage = `${normalizedImageName}`
	} catch (error) {
		console.log(error)
	}

	return playerImage
}
