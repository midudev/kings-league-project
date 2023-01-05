import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'

import { presidentApi } from './presidents.routes'
import { teamsApi } from './teams.routes'

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
    }
  ])
)

app.get('/leaderboard\\/?', (ctx) => {
  return ctx.json(leaderboard)
})

app.route('/presidents', presidentApi)
app.route('/teams', teamsApi)

app.get('/static/*', serveStatic({ root: './' }))

export default app
