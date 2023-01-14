import coaches from 'db/coaches.json'
import leaderboard from 'db/leaderboard.json'
import mvp from 'db/mvp.json'
import playersTwelve from 'db/players_twelve.json'
import presidents from 'db/presidents.json'
import schedule from 'db/schedule.json'
import teams from 'db/teams.json'
import topAssists from 'db/top_assists.json'
import topScorers from 'db/top_scorers.json'
import topStatistics from 'db/top_statistics.json'
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(cors({ origin: '*' }))

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
				},
				{
					name: 'playerId',
					endpoint: '/teams/:id/players/:playerId',
					description: 'Returns a player from a Kings League team.'
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
			description:
				'Returns the schedule of all Kings League matches and the final score of each match played'
		},
		{
			endpoint: '/players-12',
			description: 'Returns all Kings League Players Twelve'
		}
	])
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

app.get('/teams/:id/players/:playerId', (ctx) => {
	const teamId = ctx.req.param('id')
	const playerId = ctx.req.param('playerId')
	const foundTeam = teams.find((team) => team.id === teamId)
	if (!foundTeam) return ctx.json({ message: 'Team not found' }, 404)
	const foundPlayer = foundTeam.players.find((player) => player.id === `${teamId}-${playerId}`)
	return foundPlayer
		? ctx.json(foundPlayer)
		: ctx.json({ message: `Players for team ${teamId} not found` }, 404)
})

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
