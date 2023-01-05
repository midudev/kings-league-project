import { Hono } from 'hono'

import top_scorer from '../../db/top_scorer.json'

const topScorerApi = new Hono()

/**
	@api {GET} /top-scorer Get Top Scorers
	@apiName GetTopScorer
	@APIGroup Top Scorers
	@apiSuccess {Object[]} Top Scorers.
	@apiSuccess {String} topScorer.playerName Top Scorer's name.
	@apiSuccess {String} topScorer.gamesPlayed Played games.
	@apiSuccess {String} topScorer.goals Number of goals
	@apiSuccess {String} topScorer.rank Ranking position
	@apiSuccess {String} topScorer.team Team belongs to player
	@apiSuccess {String} topScorer.image Logo of the team
*/
topScorerApi.get('/', (ctx) => {
  return ctx.json(top_scorer)
})

export { topScorerApi }
