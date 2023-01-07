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
		},
		{
			endpoint: '/schedule',
			description: 'Returns Kings League match schedule and the final score of played games.'
		},
		{
			endpoint: '/players-12',
			description: 'Returns Kings League Players Twelve'
		}
	])
)

app.get('/leaderboard', (ctx) => {
	return ctx.json(leaderboard)
})

app.get('/leaderboard/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const foundTeam = leaderboard.find((stats) => stats.team.id === teamId)

	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/teams', (ctx) => {
	return ctx.json(teams)
})

app.get('/presidents', (ctx) => {
	return ctx.json(presidents)
})

app.get('/top-statistics', (ctx) => {
	return ctx.json(topStatistics)
})

app.get('/top-scorers', (ctx) => {
	return ctx.json(topScorers)
})

app.get('/top-scorers/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundScorer = topScorers.find((scorer) => scorer.ranking === ranking)

	return foundScorer ? ctx.json(foundScorer) : ctx.json({ message: 'Top scorer not found' }, 404)
})

app.get('/top-assists', (ctx) => {
	return ctx.json(topAssists)
})

app.get('/top-assists/:rank', (ctx) => {
	const ranking = ctx.req.param('rank')
	const foundAssister = topAssists.find((assister) => assister.rank === ranking)

	return foundAssister
		? ctx.json(foundAssister)
		: ctx.json({ message: 'Top assister not found' }, 404)
})

app.get('/mvp', (ctx) => {
	return ctx.json(mvp)
})

app.get('/coaches', (ctx) => {
	return ctx.json(coaches)
})

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

app.get('/schedule', (ctx) => {
	return ctx.json(schedule)
})

app.get('/teams/:id/players-12', (ctx) => {
	const id = ctx.req.param('id')
	const foundPlayerTwelve = playersTwelve.filter((player) => player.team.id === id)

	return foundPlayerTwelve
		? ctx.json(foundPlayerTwelve)
		: ctx.json({ message: `Players for team ${id} not found` }, 404)
})

app.get('/players-12', (ctx) => {
	return ctx.json(playersTwelve)
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
