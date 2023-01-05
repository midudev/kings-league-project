import { Hono } from 'hono'

import mvp from '../../db/mvp.json'

const mvpApi = new Hono()

mvpApi.get('/', (ctx) => {
  return ctx.json(mvp)
})

export { mvpApi }
