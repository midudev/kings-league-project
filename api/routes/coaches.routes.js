import { Hono } from 'hono'

import coaches from '../../db/coaches.json'

const coachesApi = new Hono()

/**
	@api {GET} /coaches Get all coaches
	@apiName GetCoaches
	@APIGroup Coaches
	@apiSuccess {Object[]} Coaches list.
	@apiSuccess {String} coaches.name Name of coach.
	@apiSuccess {String} coaches.teamName Name of team belongs to coach.
	@apiSuccess {String} coaches.image Image o the coach.
*/
coachesApi.get('/', (ctx) => {
  return ctx.json(coaches)
})

export { coachesApi }
