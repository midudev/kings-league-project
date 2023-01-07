import { Hono } from 'hono'

import presidents from '../../db/presidents.json'

const presidentApi = new Hono()

/**
  @api {GET} /presidents Get all presidents
  @apiName GetPresidents
  @apiGroup Presidents
  @apiSuccess {Object[]} presidents list.
  @apiSuccess {Number} presidents.id President ID.
  @apiSuccess {String} presidents.name President name.
  @apiSuccess {String} presidents.image President image.
  @apiSuccess {String} presidents.teamId President ID belongs to team.
*/
presidentApi.get('/', (ctx) => {
	return ctx.json(presidents)
})

/**
  @api {GET} /presidents/:id Get a president by ID
  @apiName GetPresidentById
  @apiGroup Presidents
  @apiParam {String} id Id of President
  @apiSuccess {Number} presidents.id President ID.
  @apiSuccess {String} presidents.name President name.
  @apiSuccess {String} presidents.image President image.
  @apiSuccess {String} presidents.teamId President ID belongs to team.
  @apiError (404) {Object} NotFoundError President not found.
*/
presidentApi.get('/:id', (ctx) => {
	const id = ctx.req.param('id')
	const foundPresident = presidents.find((president) => president.id === id)
	if (!foundPresident) {
		return ctx.json({ message: 'President not found' }, 404)
	}

	return ctx.json(foundPresident)
})

export { presidentApi }
