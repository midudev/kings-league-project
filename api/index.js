import leaderboardService from 'services/leaderboardService'
import teamService from 'services/teamService'
import playerService from 'services/playerService'
import presidentService from 'services/presidentService'
import coachService from 'services/coachService'
import statisticService from 'services/statisticService'
import scheduleService from 'services/scheduleService'
import schema from 'graphql/typeDefs'
import rootResolver from 'graphql/resolvers'
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { cors } from 'hono/cors'
import { graphqlServer } from '@honojs/graphql-server'

const app = new Hono()
app.use(cors({ origin: '*' }))
app.use('*', (ctx) => {
	ctx.json({
		message:
			'La API ya no está disponible tras un requerimiento de Kosmos Holding de cese y desistimiento.'
	})
})
/*
app.use(cors({ origin: '*' }))

app.use(
	'/graphql',
	graphqlServer({
		schema,
		rootResolver
	})
)

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

app.get('/leaderboard', (ctx) => ctx.json(leaderboardService.getLeaderBoard()))

app.get('/leaderboard/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const foundTeam = leaderboardService.getLeaderBoardByTeam({ teamId })
	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/teams', (ctx) => ctx.json(teamService.getListTeams()))

app.get('/presidents', (ctx) => ctx.json(presidentService.getListPresidents()))

app.get('/top-statistics', (ctx) => ctx.json(statisticService.getListTopStatistics()))

app.get('/top-scorers', (ctx) => ctx.json(statisticService.getListTopScorers()))

app.get('/top-scorers/:rank', (ctx) => {
	const ranking = parseInt(ctx.req.param('rank'))
	const foundScorer = statisticService.getTopScorerByRanking({ ranking })

	return foundScorer ? ctx.json(foundScorer) : ctx.json({ message: 'Top scorer not found' }, 404)
})

app.get('/top-assists', (ctx) => ctx.json(statisticService.getListTopAssists()))

app.get('/top-assists/:rank', (ctx) => {
	const ranking = parseInt(ctx.req.param('rank'))
	const foundAssister = statisticService.getTopAssistByRanking({ ranking })

	return foundAssister
		? ctx.json(foundAssister)
		: ctx.json({ message: 'Top assister not found' }, 404)
})

app.get('/mvp', (ctx) => ctx.json(statisticService.getListMvp()))

app.get('/coaches', (ctx) => ctx.json(coachService.getListCoaches()))

app.get('/coaches/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const foundedCoach = coachService.getCoachByTeam({ teamId })

	return foundedCoach ? ctx.json(foundedCoach) : ctx.json({ message: 'Coach not found' }, 404)
})

app.get('/presidents/:id', (ctx) => {
	const presidentId = ctx.req.param('id')
	const foundPresident = presidentService.getPresidentById({ presidentId })

	return foundPresident
		? ctx.json(foundPresident)
		: ctx.json({ message: 'President not found' }, 404)
})

app.get('/teams/:id', (ctx) => {
	const teamId = ctx.req.param('id')
	const foundTeam = teamService.getTeamById({ teamId })

	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/schedule', (ctx) => ctx.json(scheduleService.getListSchedule()))

app.get('/teams/:id/players/:playerId', (ctx) => {
	const teamId = ctx.req.param('id')
	const playerId = ctx.req.param('playerId')
	const foundPlayer = playerService.getPlayerByTeam({ teamId, playerId })
	return foundPlayer
		? ctx.json(foundPlayer)
		: ctx.json({ message: `Players for team ${teamId} not found` }, 404)
})

app.get('/teams/:id/players-12', (ctx) => {
	const teamId = ctx.req.param('id')
	const foundPlayerTwelve = playerService.getTwelvePlayersByTeam({ teamId })

	return foundPlayerTwelve
		? ctx.json(foundPlayerTwelve)
		: ctx.json({ message: `Players for team ${teamId} not found` }, 404)
})

app.get('/players-12', (ctx) => ctx.json(playerService.getListTwelvePlayers()))

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((c) => {
	const { pathname } = new URL(c.req.url)

	if (c.req.url.at(-1) === '/') {
		return c.redirect(pathname.slice(0, -1))
	}

	return c.json({ message: 'Not Found' }, 404)
})
*/

export default app
