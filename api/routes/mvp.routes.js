import { Hono } from 'hono'

import mvp from '../../db/mvp.json'

const mvpApi = new Hono()

/**
  @api {GET} /mvp Get all presidents
  @apiName GetMVPPlayers
  @apiGroup MVP
  @apiSuccess {Object[]} MVP List of players.
  @apiSuccess {String} MVP.playerName MVP player's name.
  @apiSuccess {String} MVP.gamesPlayed Player games.
  @apiSuccess {String} MVP.mvps Number of MVPs
  @apiSuccess {String} MVP.rank Ranking position
  @apiSuccess {String} MVP.team Team belongs to player
  @apiSuccess {String} MVP.image Logo of the team
*/
mvpApi.get('/', (ctx) => {
  return ctx.json(mvp)
})

export { mvpApi }
