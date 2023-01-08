import { readDBFile, TEAMS } from 'db/index.js'

const LIMIT_TOP = 5

const getLimitFrom = (array) => array.slice(0, LIMIT_TOP)

const [leaderboardDB, mvpDB, topScorersDB, topAssistsDB] = await Promise.all([
	readDBFile('leaderboard'),
	readDBFile('mvp'),
	readDBFile('top_scorers'),
	readDBFile('top_assists'),
	readDBFile('players_twelve')
])

const keys = [
	{
		category: 'mvp'
	},
	{
		category: 'topScorers'
	},
	{
		category: 'topAssists'
	}
]

export function getTopStatistics($) {
	const extractIdFromUrl = (url) => url.split('/').at(-1).split('.').at(0)

	const $rows = $('.uk-card-media-right.uk-cover-container>img.el-image:not(.uk-invisible)')

	$rows.each((idx, el) => {
		const $el = $(el)
		const id = extractIdFromUrl($el.attr('src'))
		keys[idx].id = id
	})

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

	const mvp = getLimitFrom(mvpDB).map(extractMoreData)
	const topScorers = getLimitFrom(topScorersDB).map(extractMoreData)
	const topAssists = getLimitFrom(topAssistsDB).map(extractMoreData)

	return {
		leaderboard,
		mvp: addImageToFirstPlayer(mvp, 'mvp'),
		topScorers: addImageToFirstPlayer(topScorers, 'topScorers'),
		topAssists: addImageToFirstPlayer(topAssists, 'topAssists')
	}
}

function extractMoreData(player) {
	const { team: teamName } = player
	const team = TEAMS.find((team) => team.name === teamName)

	const { id: teamId } = team

	return {
		...player,
		teamId
	}
}

function addImageToFirstPlayer(array, category) {
	return [
		...array.slice(0, 1).map((player) => {
			const id = keys.find((key) => key.category === category).id
			const playerImage = `${player.teamId}-${id}.webp`
			return { ...player, playerImage }
		}),
		...array.slice(1)
	]
}
