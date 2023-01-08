import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import presidents from '../db/presidents.json'
import topScorers from '../db/top_scorers.json'
import coaches from '../db/coaches.json'
import mvp from '../db/mvp.json'
import topAssists from '../db/top_assists.json'
import schedule from '../db/schedule.json'
import playersTwelve from '../db/players_twelve.json'
import topStatistics from '../db/top_statistics.json'
import infoRoutes from '../db/info_routes.json'

const app = new Hono()

app.get('/', (ctx) =>
	ctx.json(infoRoutes)
)

app.get('/leaderboard', (ctx) => ctx.json(leaderboard))

app.get('/leaderboard/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const foundTeam = leaderboard.find((stats) => stats.team.id === teamId)

	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/teams', (ctx) => ctx.json(teams))

app.get('/presidents', (ctx) => ctx.json(presidents))

app.get('/top-statistics', (ctx) => ctx.json(topStatistics))

app.get('/top-scorers', (ctx) => ctx.json(topScorers))

app.get('/top-scorers/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundScorer = topScorers.find((scorer) => scorer.ranking === ranking)

	return foundScorer ? ctx.json(foundScorer) : ctx.json({ message: 'Top scorer not found' }, 404)
})

app.get('/top-assists', (ctx) => ctx.json(topAssists))

app.get('/top-assists/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundAssister = topAssists.find((assister) => assister.rank === ranking)

	return foundAssister
		? ctx.json(foundAssister)
		: ctx.json({ message: 'Top assister not found' }, 404)
})

app.get('/mvp', (ctx) => ctx.json(mvp))

app.get('/coaches', (ctx) => ctx.json(coaches))

app.get('/coaches/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const teamName = teams.find((team) => team.id === teamId)
	const foundedCoach = coaches.find((coach) => coach.teamName === teamName)

	return foundedCoach ? ctx.json(foundedCoach) : ctx.json({ message: 'Coach not found' }, 404)
})

app.get('/presidents/:id', (ctx) => {
	const id = ctx.req.param('id')
	const foundPresident = presidents.find((president) => president.id === id)

	return foundPresident
		? ctx.json(foundPresident)
		: ctx.json({ message: 'President not found' }, 404)
})

app.get('/teams/:id', (ctx) => {
	const id = ctx.req.param('id')
	const foundTeam = teams.find((team) => team.id === id)

	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/schedule', (ctx) => ctx.json(schedule))

app.get('/teams/:id/players-12', (ctx) => {
	const id = ctx.req.param('id')
	const foundPlayerTwelve = playersTwelve.filter((player) => player.team.id === id)

	return foundPlayerTwelve
		? ctx.json(foundPlayerTwelve)
		: ctx.json({ message: `Players for team ${id} not found` }, 404)
})

app.get('/players-12', (ctx) => ctx.json(playersTwelve))

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((c) => {
	const { pathname } = new URL(c.req.url)

	if (c.req.url.at(-1) === '/') {
		return c.redirect(pathname.slice(0, -1))
	}

	return c.json({ message: 'Not Found' }, 404)
})

export default app
