import { Hono } from 'hono'

import topAssists from '../../db/top_assists.json'

const topAssistsApi = new Hono()

/**
  @api {GET} /top-assists Get Top Assists
  @apiName GetTopAssists
  @apiGroup Top Assists
  @apiSuccess {Object[]} Top Assists.
  @apiSuccess {String} topAssists.playerName Top Scorer's name.
  @apiSuccess {String} topAssists.gamesPlayed Played games.
  @apiSuccess {String} topAssists.assists Number of assists.
  @apiSuccess {String} topAssists.rank Ranking position.
  @apiSuccess {String} topAssists.team Team belongs to player.
  @apiSuccess {String} topAssists.image Logo of the team.
*/
topAssistsApi.get('/', (ctx) => {
	return ctx.json(topAssists)
})

/**
  @api {GET} /top-assists/:rank Get Top Assists by rank
  @apiName GetTopAssistsByRank
  @apiGroup Top Assists
  @apiParam {String} rank Id of ranking
  @apiSuccess {String} topAssists.playerName Top Scorer's name.
  @apiSuccess {String} topAssists.gamesPlayed Played games.
  @apiSuccess {String} topAssists.assists Number of assists.
  @apiSuccess {String} topAssists.rank Ranking position.
  @apiSuccess {String} topAssists.team Team belongs to player.
  @apiSuccess {String} topAssists.image Logo of the team.
  @apiError (404) {Object} NotFoundError Team not found.
*/
topAssistsApi.get('/:rank', (ctx) => {
  const ranking = ctx.req.param('rank')
	const foundAssister = topAssists.find((assister) => assister.rank === ranking)

	return foundAssister
		? ctx.json(foundAssister)
		: ctx.json({ message: 'Top assister not found' }, 404)
})

export { topAssistsApi }
