import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'

import { coachesApi } from './routes/coaches.routes'
import { mvpApi } from './routes/mvp.routes'
import { presidentApi } from './routes/presidents.routes'
import { teamsApi } from './routes/teams.routes'
import { topScorerApi } from './routes/top-scorer.routes'

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
app.route('/top-scorer', topScorerApi)
app.route('/mvp', mvpApi)
app.route('/coachs', coachesApi)

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((c) => {
  const { pathname } = new URL(c.req.url)

  if (c.req.url.at(-1) === '/') {
    return c.redirect(pathname.slice(0, -1))
  }

  return c.json({ message: 'Not Found' }, 404)
})

export default app
