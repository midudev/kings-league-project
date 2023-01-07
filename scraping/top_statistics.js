import { readDBFile, TEAMS } from '../db/index.js'

const LIMIT_TOP = 5

const getLimitFrom = (array) => array.slice(0, LIMIT_TOP)

const [leaderboardDB, mvpDB, topScorersDB, topAssistsDB] = await Promise.all([
	readDBFile('leaderboard'),
	readDBFile('mvp'),
	readDBFile('top_scorers'),
	readDBFile('top_assists'),
	readDBFile('players_twelve')
])

export function getTopStatistics() {
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

	const mvp = getLimitFrom(mvpDB).map(generatePlayerData)
	const topScorers = getLimitFrom(topScorersDB).map(generatePlayerData)
	const topAssists = getLimitFrom(topAssistsDB).map(generatePlayerData)

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
	const team = TEAMS.find((team) => team.name === teamName)
	const player = team.players.find((player) => player.name === playerName)

	// we need to get the player 12 image/info if needed

	const playerImage = player?.image ? `${player.image}` : 'placeholder.png'

	return playerImage
}
