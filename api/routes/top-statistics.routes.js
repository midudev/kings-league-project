import { Hono } from 'hono'

import topStatistics from '../../db/top_statistics.json'

const topStatisticsApi = new Hono()

/**
  @api {GET} /top-scores Get Top Statistics
  @apiName GetTopStatistics
  @apiGroup Top Scorers
  @apiSuccess {Object} Top Statistics.
  @apiSuccess {Object[]} topStatistics.leaderboard Statistics Leaderboard.
  @apiSuccess {Object[]} topStatistics.mvp Statistics MVP.
  @apiSuccess {Object[]} topStatistics.topScorers Statistics of Top Scorers
  @apiSuccess {Object[]} topStatistics.topAssists Statistics of Top Assists
*/
topStatisticsApi.get('/', (ctx) => {
	return ctx.json(topStatistics)
})

export { topStatisticsApi }
