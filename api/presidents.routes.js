import { Hono } from 'hono'

import presidents from '../db/presidents.json'

const presidentApi = new Hono()

presidentApi.get('/', (ctx) => {
  return ctx.json(presidents)
})

presidentApi.get('/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundPresident = presidents.find((president) => president.id === id)

  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json({ message: 'President not found' }, 404)
})

export { presidentApi }
