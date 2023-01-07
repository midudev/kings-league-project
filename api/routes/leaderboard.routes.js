import { Hono } from 'hono'

import leaderboard from '../../db/leaderboard.json'

const leaderboardApi = new Hono()

/**
	@api {GET} /leaderboard Get all teams
	@apiName GetLeaderboard
	@apiGroup Leaderboard
	@apiSuccess {Object[]} leaderboard list.
	@apiSuccess {Number} leaderboard.wins Team wins.
	@apiSuccess {Number} leaderboard.loses Team loses.
	@apiSuccess {Number} leaderboard.scoredGoals Scored goals of team.
	@apiSuccess {Number} leaderboard.concededGoals Conceded goals of team.
	@apiSuccess {Number} leaderboard.yellowCards Yellow cards accumulated..
	@apiSuccess {Array} leaderboard.redCards Red cards accumulated.
	@apiSuccess {Object} leaderboard.team Team info.
	@apiSuccess {Number} leaderboard.rank Ranking.
	@apiError (404) {Object} NotFoundError Leaderboard not found.
*/
leaderboardApi.get('/', (ctx) => {
	return ctx.json(leaderboard)
})

/**
	@api {GET} /leaderboard/:teamId Get leaderboard by team ID
	@apiName GetLeaderboardByTeamId
	@apiGroup Leaderboard
	@apiParam {String} teamId Id of team
	@apiSuccess {Number} leaderboard.wins Team wins.
	@apiSuccess {Number} leaderboard.loses Team loses.
	@apiSuccess {Number} leaderboard.scoredGoals Scored goals of team.
	@apiSuccess {Number} leaderboard.concededGoals Conceded goals of team.
	@apiSuccess {Number} leaderboard.yellowCards Yellow cards accumulated..
	@apiSuccess {Array} leaderboard.redCards Red cards accumulated.
	@apiSuccess {Object} leaderboard.team Team info.
	@apiSuccess {Number} leaderboard.rank Ranking.
	@apiError (404) {Object} NotFoundError Leaderboard not found.
*/
leaderboardApi.get('/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const foundTeam = leaderboard.find((stats) => stats.team.id === teamId)

	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

export { leaderboardApi }
