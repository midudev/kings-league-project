import { Hono } from 'hono'

import coaches from '../../db/coaches.json'
import teams from '../../db/teams.json'

const coachesApi = new Hono()

/**
	@api {GET} /coaches Get all coaches
	@apiName GetCoaches
	@apiGroup Coaches
	@apiSuccess {Object[]} Coaches list.
	@apiSuccess {String} coaches.name Name of coach.
	@apiSuccess {String} coaches.teamName Name of team belongs to coach.
	@apiSuccess {String} coaches.image Image o the coach.
*/
coachesApi.get('/', (ctx) => {
  return ctx.json(coaches)
})

/**
	@api {GET} /coaches/:teamId Get all coaches by team ID
	@apiName GetCoachByTeamId
	@apiGroup Coaches
	@apiParam {String} teamId Id of team
	@apiSuccess {String} coaches.name Name of coach.
	@apiSuccess {String} coaches.teamName Name of team belongs to coach.
	@apiSuccess {String} coaches.image Image o the coach.
	@apiError (404) {Object} NotFoundError President not found.
*/
coachesApi.get('/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const teamName = teams.find((team) => team.id === teamId)
	const foundedCoach = coaches.find((coach) => coach.teamName === teamName)

	return foundedCoach ? ctx.json(foundedCoach) : ctx.json({ message: 'Coach not found' }, 404)
})

export { coachesApi }
