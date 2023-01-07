import { readFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './db/')

const [leaderboardDB, mvpDB, topScorersDB, topAssistsDB] = await Promise.all([
	readFile(`${DB_PATH}/leaderboard.json`, 'utf-8'),
	readFile(`${DB_PATH}/mvp.json`, 'utf-8'),
	readFile(`${DB_PATH}/top_scorers.json`, 'utf-8'),
	readFile(`${DB_PATH}/top_assists.json`, 'utf-8'),
	// readFile(`${DB_PATH}/players_twelve.json`, 'utf-8'),
]).then((file) => file.map(JSON.parse))

export function getTop5Statistics() {
	const leaderboard = leaderboardDB.slice(0, 5).map((data) => {
		const { team, ...rest } = data
		const { id, name, image, coach, shortName } = team
		return {
			...rest,
			team: {
				id,
				name,
				image,
				coach,
				shortName
			}
		}
	})

	const mvp = mvpDB.slice(0, 5).map(generatePlayerData)

	const topScorers = topScorersDB.slice(0, 5).map(generatePlayerData)

	const topAssists = topAssistsDB.slice(0, 5).map(generatePlayerData)

	return { leaderboard, mvp, topScorers, topAssists }
}

function generatePlayerData(player) {
	const playerImage = findPlayerImage({ playerName: player.playerName, teamName: player.team })
	return {
		...player,
		playerImage
	}
}

function findPlayerImage({ playerName, teamName }) {
	const player = leaderboardDB
		.find(({ team }) => team.name === teamName)
		.team.players.find((player) => player.name === playerName)

	const playerImage = player?.image
		? `${player.image}`
		: 'placeholder.png'

	return playerImage
}

console.log(getTop5Statistics());