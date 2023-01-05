import { Hono } from 'hono'

import coaches from '../../db/coaches.json'

const coachesApi = new Hono()

coachesApi.get('/', (ctx) => {
  return ctx.json(coaches)
})

export { coachesApi }
