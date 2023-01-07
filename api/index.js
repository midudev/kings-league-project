import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'

import { coachesApi } from './routes/coaches.routes'
import { mvpApi } from './routes/mvp.routes'
import { presidentApi } from './routes/presidents.routes'
import { teamsApi } from './routes/teams.routes'
import { topScorersApi } from './routes/top-scorers.routes'
import { topAssistsApi } from './routes/top-assists.routes'
import { leaderboardApi } from './routes/leaderboard.routes'

const app = new Hono()

app.get('/', (ctx) =>
	ctx.json([
		{
			endpoint: '/leaderboard',
			description: 'Returns Kings League leaderboard',
			parameters: [
				{
					name: 'team',
					endpoint: '/leaderboard/:teamId',
					description: 'Return Kings League leaderboard info from Team Id'
				}
			]
		},
		{
			endpoint: '/teams',
			description: 'Returns Kings League teams',
			parameters: [
				{
					name: 'id',
					endpoint: '/teams/:id',
					description: 'Return Kings League team by id'
				}
			]
		},
		{
			endpoint: '/presidents',
			description: 'Returns Kings League presidents',
			parameters: [
				{
					name: 'id',
					endpoint: '/presidents/:id',
					description: 'Return Kings League president by id'
				}
			]
		},
		{
			endpoint: '/coaches',
			description: 'Returns Kings League coaches',
			parameters: [
				{
					name: 'teamId',
					endpoint: '/top-assists/:teamId',
					description: 'Return Kings League coach of team by id of some'
				}
			]
		},
		{
			endpoint: '/top-assists',
			description: 'Returns Kings League Top Assists',
			parameters: [
				{
					name: 'rank',
					endpoint: '/top-assists/:rank',
					description: 'Return Kings League top assister by rank'
				}
			]
		},
		{
			endpoint: '/top-scorers',
			description: 'Returns Kings League Top Scorers',
			parameters: [
				{
					name: 'rank',
					endpoint: '/top-scorers/:rank',
					description: 'Return Kings League top scorer by rank'
				}
			]
		},
		{
			endpoint: '/mvp',
			description: 'Returns Kings League Most Valuable Players'
		}
	])
)

app.route('/coachs', coachesApi)
app.route('/leaderboard', leaderboardApi)
app.route('/mvp', mvpApi)
app.route('/presidents', presidentApi)
app.route('/teams', teamsApi)
app.route('/top-assists', topAssistsApi)
app.route('/top-scorers', topScorersApi)

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((c) => {
	const { pathname } = new URL(c.req.url)

	if (c.req.url.at(-1) === '/') {
		return c.redirect(pathname.slice(0, -1))
	}

	return c.json({ message: 'Not Found' }, 404)
})

export default app
