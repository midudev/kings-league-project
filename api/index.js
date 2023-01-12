import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { cors } from 'hono/cors'

import { coachesApi } from './routes/coaches.routes'
import { mvpApi } from './routes/mvp.routes'
import { presidentApi } from './routes/presidents.routes'
import { teamsApi } from './routes/teams.routes'
import { topScorersApi } from './routes/top-scorers.routes'
import { topAssistsApi } from './routes/top-assists.routes'
import { leaderboardApi } from './routes/leaderboard.routes'
import { playersTwelveApi } from './routes/players-twelve.routes'
import { scheduleApi } from './routes/schedule.routes'
import { topStatisticsApi } from './routes/top-statistics.routes'

import apiDirectory from '../db/api.json'

const app = new Hono()
app.use(cors({ origin: '*' }))

app.route('/coaches', coachesApi)
app.route('/leaderboard', leaderboardApi)
app.route('/mvp', mvpApi)
app.route('/presidents', presidentApi)
app.route('/teams', teamsApi)
app.route('/top-assists', topAssistsApi)
app.route('/top-scorers', topScorersApi)
app.route('/players-12', playersTwelveApi)
app.route('/schedule', scheduleApi)
app.route('/top-statistics', topStatisticsApi)

app.use('/static/*', serveStatic({ root: './' }))
app.use('/assets/*', serveStatic({ root: './static/docs/api' }))

app.get('/', (ctx) => ctx.json(apiDirectory))
app.get('/api', serveStatic({ path: './static/docs/api' }))
app.get('/assets', serveStatic({ path: './assets' }))

app.notFound((c) => {
	const { pathname } = new URL(c.req.url)

	if (c.req.url.at(-1) === '/') {
		return c.redirect(pathname.slice(0, -1))
	}

	return c.json({ message: 'Not Found' }, 404)
})

export default app
