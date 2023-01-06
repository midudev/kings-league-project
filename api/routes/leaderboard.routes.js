import { Hono } from 'hono'

import leaderboard from '../../db/leaderboard.json'

const leaderboardApi = new Hono()

/**
	@api {GET} /teams Get all teams
	@apiName GetTeams
	@APIGroup Teams
	@apiSuccess {Object[]} team list.
	@apiSuccess {Number} teams.id Team ID.
	@apiSuccess {String} teams.name Team name.
	@apiSuccess {String} teams.image Team image.
	@apiSuccess {String} teams.url Team URL.
	@apiSuccess {Number} presindent.id ID of President belongs to team.
	@apiSuccess {String} teams.channel URL of channel of the team.
	@apiSuccess {Array} teams.socialNetwork List of networks of the team.
	@apiSuccess {Array} teams.players List of players belongs to team.
	@apiSuccess {String} teams.coach Name of the coach.
*/
leaderboardApi.get('/', (ctx) => {
	return ctx.json(leaderboard)
})

/**
	@api {GET} /teams/teamId Get team by ID
	@apiName GetTeams
	@APIGroup Teams
	@apiSuccess {Number} teams.id Team ID.
	@apiSuccess {String} teams.name Team name.
	@apiSuccess {String} teams.image Team image.
	@apiSuccess {String} teams.url Team URL.
	@apiSuccess {Number} presindent.id ID of President belongs to team.
	@apiSuccess {String} teams.channel URL of channel of the team.
	@apiSuccess {Array} teams.socialNetwork List of networks of the team.
	@apiSuccess {Array} teams.players List of players belongs to team.
	@apiSuccess {String} teams.coach Name of the coach.
	@apiError (404) {Object} NotFoundError Team not found.
*/
leaderboardApi.get('/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const foundTeam = leaderboard.find((stats) => stats.team.id === teamId)

	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

export { leaderboardApi }
