import { Hono } from 'hono'

import top_scorer from '../../db/top_scorer.json'

const topScorerApi = new Hono()

topScorerApi.get('/', (ctx) => {
  return ctx.json(top_scorer)
})

export { topScorerApi }
