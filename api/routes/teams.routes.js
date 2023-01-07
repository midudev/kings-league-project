import { Hono } from 'hono'

import teams from '../../db/teams.json'

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

  return foundTeam
    ? ctx.json(foundTeam)
    : ctx.json({ message: 'Team not found' }, 404)
})

export { teamsApi }
