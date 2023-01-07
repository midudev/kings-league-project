import { Hono } from 'hono'

import topAssists from '../../db/top_assists.json'

const topAssistsApi = new Hono()

/**
	@api {GET} /top-assists Get Top Assists
	@apiName GetTopAssists
	@APIGroup Top Assists
	@apiSuccess {Object[]} Top Scorers.
	@apiSuccess {String} topScorer.playerName Top Scorer's name.
	@apiSuccess {String} topScorer.gamesPlayed Played games.
	@apiSuccess {String} topScorer.assists Number of assists.
	@apiSuccess {String} topScorer.rank Ranking position.
	@apiSuccess {String} topScorer.team Team belongs to player.
	@apiSuccess {String} topScorer.image Logo of the team.
*/
topAssistsApi.get('/', (ctx) => {
  return ctx.json(topAssists)
})

/**
	@api {GET} /top-assists/:id Get Top Assists
	@apiName GetTopAssistsById
	@APIGroup Top Assists
	@apiSuccess {String} topScorer.playerName Top Scorer's name.
	@apiSuccess {String} topScorer.gamesPlayed Played games.
	@apiSuccess {String} topScorer.assists Number of assists.
	@apiSuccess {String} topScorer.rank Ranking position.
	@apiSuccess {String} topScorer.team Team belongs to player.
	@apiSuccess {String} topScorer.image Logo of the team.
	@apiError (404) {Object} NotFoundError Team not found.
*/
topAssistsApi.get('/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundAssist = topAssists.find((scorer) => scorer.ranking === ranking)

	return foundAssist ? ctx.json(foundAssist) : ctx.json({ message: 'Top assist not found' }, 404)
})

export { topAssistsApi }
