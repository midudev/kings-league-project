import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'

import { presidentApi } from './presidents.routes'
import { teamsApi } from './teams.routes'

import coachs from '../db/coachs.json'
import top_scorer from '../db/top_scorer.json'
import mvp from '../db/mvp.json'

const app = new Hono()

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns Kings League leaderboard'
    },
    {
      endpoint: '/teams',
      description: 'Returns Kings League teams'
    },
    {
      endpoint: '/presidents',
      description: 'Returns Kings League presidents'
    },
    {
      endpoint: '/coachs',
      description: 'Returns Kings League coachs'
    }
  ])
)

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.route('/presidents', presidentApi)
app.route('/teams', teamsApi)

app.get('/coachs\\/?', (ctx) => {
  return ctx.json(coachs)
})

app.get('/top-scorer', (ctx) => {
	return ctx.json(top_scorer)
})

app.get('/mvp', (ctx) => {
	return ctx.json(mvp)
})

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((c) => {
  const { pathname } = new URL(c.req.url)

  if (c.req.url.at(-1) === '/') {
    return c.redirect(pathname.slice(0, -1))
  }

  return c.json({ message: 'Not Found' }, 404)
})

export default app
