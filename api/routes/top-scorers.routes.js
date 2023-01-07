import { Hono } from 'hono'

import topScorers from '../../db/top_scorers.json'

const topScorersApi = new Hono()

/**
	@api {GET} /top-scores Get Top Scorers
	@apiName GetTopScorers
	@apiGroup Top Scorers
	@apiSuccess {Object[]} Top Scorers.
	@apiSuccess {String} topScorers.playerName Top Scorer's name.
	@apiSuccess {String} topScorers.gamesPlayed Played games.
	@apiSuccess {String} topScorers.goals Number of goals
	@apiSuccess {String} topScorers.rank Ranking position
	@apiSuccess {String} topScorers.team Team belongs to player
	@apiSuccess {String} topScorers.image Logo of the team
*/
topScorersApi.get('/', (ctx) => {
  return ctx.json(topScorers)
})

/**
	@api {GET} /top-scores/:rank Get Top Scorers by rank
	@apiName GetTopScorersByRank
	@apiGroup Top Scorers
	@apiParam {String} rank Id of ranking
	@apiSuccess {String} topScorers.playerName Top Scorer's name.
	@apiSuccess {String} topScorers.gamesPlayed Played games.
	@apiSuccess {String} topScorers.goals Number of goals
	@apiSuccess {String} topScorers.rank Ranking position
	@apiSuccess {String} topScorers.team Team belongs to player
	@apiSuccess {String} topScorers.image Logo of the team
	@apiError (404) {Object} NotFoundError Team not found.
*/
topScorersApi.get('/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundScorer = topScorers.find((scorer) => scorer.ranking === ranking)

	return foundScorer ? ctx.json(foundScorer) : ctx.json({ message: 'Top scorer not found' }, 404)
})

export { topScorersApi }
