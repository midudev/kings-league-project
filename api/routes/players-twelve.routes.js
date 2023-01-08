import { Hono } from 'hono'

import playersTwelve from '../../db/players_twelve.json'

const playersTwelveApi = new Hono()

/**
  @api {GET} /players-12 Get all teams
  @apiName GetPlayersTwelve
  @apiGroup Player 12
  @apiSuccess {Object[]} Players twelve list.
  @apiSuccess {String} playersTwelve.role Player role.
  @apiSuccess {String} playersTwelve.firstName Player first name.
  @apiSuccess {String} playersTwelve.lastName Player first name.
  @apiSuccess {String} playersTwelve.image Player image.
  @apiSuccess {String} playersTwelve.id Player ID.
  @apiSuccess {Object} playersTwelve.team Team belongs to Player.
*/
playersTwelveApi.get('/', (ctx) => {
	return ctx.json(playersTwelve)
})

export { playersTwelveApi }
