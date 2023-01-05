import { Hono, Router } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import presidents from '../db/presidents.json'

const app = new Hono()

const router = new Router()

router.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard'
    }
  ])
)

router.get('/leaderboard\\/?', async (ctx) => {
  return ctx.json(await leaderboard)
})

router.get('/presidents\\/?', async (ctx) => {
  return ctx.json(await presidents)
})

router.get('/presidents/:id', async (ctx) => {
  try {
    const id = ctx.req.param('id')
    const foundPresident = presidents.find((president) => president.id === id)

    return foundPresident
      ? ctx.json(foundPresident)
      : ctx.json({ message: 'President not found' }, 404)
  } catch (error) {
    return ctx.json({ message: 'An error occurred' }, 500)
  }
})

router.get('/teams\\/?', async (ctx) => {
  return ctx.json(await teams)
})

router.get('/teams/:id', async (ctx) => {
  try {
    const id = ctx.req.param('id')
    const foundTeam = teams.find((team) => team.id === id)

    return foundTeam
      ? ctx.json(foundTeam)
      : ctx.json({ message: 'Team not found' }, 404)
  } catch (error) {
    return ctx.json({ message: 'An error occurred' }, 500)
  }
})

app.use(router)

app.get('/static/*', serveStatic({ root: './' }))

export default app
