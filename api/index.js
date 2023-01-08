import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'

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

const app = new Hono()

app.get('/', (ctx) =>
	ctx.json([
		{
			endpoint: '/leaderboard',
			description: 'Returns the Kings League leaderboard',
			parameters: [
				{
					name: 'team',
					endpoint: '/leaderboard/:teamId',
					description: 'Return the Kings League leaderboard information for a team by his id'
				}
			]
		},
		{
			endpoint: '/teams',
			description: 'Returns all Kings League teams',
			parameters: [
				{
					name: 'id',
					endpoint: '/teams/:id',
					description: 'Return a Kings League team by his id'
				},
				{
					name: 'player-12',
					endpoint: '/teams/:id/players-12',
					description: 'Return the Kings League players 12 for the choosed team'
				}
			]
		},
		{
			endpoint: '/presidents',
			description: 'Returns all Kings League presidents',
			parameters: [
				{
					name: 'id',
					endpoint: '/presidents/:id',
					description: 'Return a Kings League president by his id'
				}
			]
		},
		{
			endpoint: '/coaches',
			description: 'Returns all Kings League coaches',
			parameters: [
				{
					name: 'teamId',
					endpoint: '/coaches/:teamId',
					description: 'Return a Kings League coach by his team id'
				}
			]
		},
		{
			endpoint: '/top-statistics',
			description: 'Returns the top statistics of the Kings League'
		},
		{
			endpoint: '/top-assists',
			description: 'Returns all Kings League Top Assists',
			parameters: [
				{
					name: 'rank',
					endpoint: '/top-assists/:rank',
					description: 'Return a Kings League top assister by his rank'
				}
			]
		},
		{
			endpoint: '/top-scorers',
			description: 'Returns all Kings League Top Scorers',
			parameters: [
				{
					name: 'rank',
					endpoint: '/top-scorers/:rank',
					description: 'Return a Kings League top scorer by his rank'
				}
			]
		},
		{
			endpoint: '/mvp',
			description: 'Returns all Kings League Most Valuable Players'
		},
		{
			endpoint: '/schedule',
			description: 'Returns the schedule of all Kings League matches and the final score of each match played'
		},
		{
			endpoint: '/players-12',
			description: 'Returns all Kings League Players Twelve'
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
app.route('/players-12', playersTwelveApi)
app.route('/schedule', scheduleApi)
app.route('/top-statistics', topStatisticsApi)

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((c) => {
	const { pathname } = new URL(c.req.url)

	if (c.req.url.at(-1) === '/') {
		return c.redirect(pathname.slice(0, -1))
	}

	return c.json({ message: 'Not Found' }, 404)
})

export default app
