import { Hono } from 'hono'

import topAssists from '../../db/top_assists.json'

const topAssistApi = new Hono()

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
topAssistApi.get('/', (ctx) => {
  return ctx.json(topAssists)
})

topAssistApi.get('/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundAssist = topAssists.find((scorer) => scorer.ranking === ranking)

	return foundAssist ? ctx.json(foundAssist) : ctx.json({ message: 'Top assist not found' }, 404)
})

export { topAssistApi }
