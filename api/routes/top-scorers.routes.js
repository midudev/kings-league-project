import { Hono } from 'hono'

import topScorers from '../../db/top_scorers.json'

const topScorersApi = new Hono()

/**
	@api {GET} /top-scores Get Top Scorers
	@apiName GetTopScorers
	@APIGroup Top Scorers
	@apiSuccess {Object[]} Top Scorers.
	@apiSuccess {String} topScorer.playerName Top Scorer's name.
	@apiSuccess {String} topScorer.gamesPlayed Played games.
	@apiSuccess {String} topScorer.goals Number of goals
	@apiSuccess {String} topScorer.rank Ranking position
	@apiSuccess {String} topScorer.team Team belongs to player
	@apiSuccess {String} topScorer.image Logo of the team
*/
topScorersApi.get('/', (ctx) => {
  return ctx.json(topScorers)
})

topScorersApi.get('/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundScorer = topScorers.find((scorer) => scorer.ranking === ranking)

	return foundScorer ? ctx.json(foundScorer) : ctx.json({ message: 'Top scorer not found' }, 404)
})

export { topScorersApi }
