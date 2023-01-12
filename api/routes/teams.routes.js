import { Hono } from 'hono'

import teams from '../../db/teams.json'
import playersTwelve from '../../db/players_twelve.json'

const teamsApi = new Hono()

/**
  @api {GET} /teams Get all teams
  @apiName GetTeams
  @apiGroup Teams
  @apiSuccess {Object[]} team list.
  @apiSuccess {String} teams.id Team ID.
  @apiSuccess {String} teams.color Team primary color.
  @apiSuccess {String} teams.name Team name.
  @apiSuccess {String} teams.image Team image.
  @apiSuccess {String} teams.imageWhite Team image inverted.
  @apiSuccess {String} teams.url Team URL.
  @apiSuccess {String} teams.presidentId ID of President belongs to team.
  @apiSuccess {String} teams.channel URL of channel of the team.
  @apiSuccess {Array} teams.socialNetwork List of networks of the team.
  @apiSuccess {Array} teams.players List of players belongs to team.
  @apiSuccess {Object} teams.coachInfo Information of the coach.
*/
teamsApi.get('/', (ctx) => {
	return ctx.json(teams)
})

/**
  @api {GET} /teams/:id Get team by ID
  @apiName GetTeamById
  @apiGroup Teams
  @apiParam {String} id Id of Team
  @apiSuccess {String} teams.id Team ID.
  @apiSuccess {String} teams.color Team primary color.
  @apiSuccess {String} teams.name Team name.
  @apiSuccess {String} teams.image Team image.
  @apiSuccess {String} teams.imageWhite Team image inverted.
  @apiSuccess {String} teams.url Team URL.
  @apiSuccess {String} teams.presidentId ID of President belongs to team.
  @apiSuccess {String} teams.channel URL of channel of the team.
  @apiSuccess {Array} teams.socialNetwork List of networks of the team.
  @apiSuccess {Array} teams.players List of players belongs to team.
  @apiSuccess {Object} teams.coachInfo Information of the coach.
  @apiError (404) {Object} NotFoundError Team not found.
*/
teamsApi.get('/:id', (ctx) => {
	const id = ctx.req.param('id')
	const foundTeam = teams.find((team) => team.id === id)

	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

/**
  @api {GET} /teams/:id/players-12 Get all Player twelve from team
  @apiName GetPlayersTwelveByTeam
  @apiGroup Teams
  @apiParam {String} id Id of Team
  @apiSuccess {Object[]} Players twelve list.
  @apiSuccess {String} playersTwelve.role Player role.
  @apiSuccess {String} playersTwelve.firstName Player first name.
  @apiSuccess {String} playersTwelve.lastName Player first name.
  @apiSuccess {String} playersTwelve.image Player image.
  @apiSuccess {String} playersTwelve.id Player ID.
  @apiSuccess {Object} playersTwelve.team Team belongs to Player.
*/
teamsApi.get('/:id/players-12', (ctx) => {
	const id = ctx.req.param('id')
	const foundPlayerTwelve = playersTwelve.filter((player) => player.team.id === id)

	return foundPlayerTwelve
		? ctx.json(foundPlayerTwelve)
		: ctx.json({ message: `Players for team ${id} not found` }, 404)
})

export { teamsApi }
