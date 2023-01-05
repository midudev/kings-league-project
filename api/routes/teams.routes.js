import { Hono } from 'hono'

import teams from '../../db/teams.json'

const teamsApi = new Hono()

teamsApi.get('/', (ctx) => {
  return ctx.json(teams)
})

teamsApi.get('/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = teams.find((team) => team.id === id)

  return foundTeam
    ? ctx.json(foundTeam)
    : ctx.json({ message: 'Team not found' }, 404)
})

export { teamsApi }
