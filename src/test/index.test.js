import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

const setup = async () => {
  const worker = await unstableDev(
    'api/index.js',
    {},
    { disableExperimentalWarning: true }
  )
  return worker
}

const teardown = async (worker) => {
  await worker.stop()
}

describe('Testing / route', () => {
  let worker

  beforeAll(async () => {
    worker = await setup()
  })

  afterAll(async () => {
    await teardown(worker)
  })

  it('routes should have endpoint and description', async () => {
    const resp = await worker.fetch()
    expect(resp).toBeDefined()
    if(!resp) return

    const apiRoutes = await resp.json()
    // verify the response to have the expected format
    apiRoutes.forEach((endpoint) => {
      expect(endpoint).toHaveProperty('endpoint')
      expect(endpoint).toHaveProperty('description')
    })
  })
})

describe('Testing /teams route', () => {
  let worker

  beforeAll(async () => {
    worker = await setup()
  })

  afterAll(async () => {
    await teardown(worker)
  })

  it('The teams should have all teams', async () => {
    const resp = await worker.fetch('/teams')
    expect(resp).toBeDefined()
    if(!resp) return
    
    const teams = await resp.json()
    const numberTeams = Object.entries(teams).length

    // verify the team have all props
    teams.forEach((team) => {
      expect(team).toHaveProperty('id')
      expect(team).toHaveProperty('name')
      expect(team).toHaveProperty('image')
      expect(team).toHaveProperty('url')
      expect(team).toHaveProperty('presidentId')
      expect(team).toHaveProperty('channel')
      expect(team).toHaveProperty('coach')
      expect(team).toHaveProperty('socialNetworks')
      expect(team).toHaveProperty('players')
    })

    expect(numberTeams).toBe(12)
  })

  it('Get /teams/1k should return team props', async () => {
    const resp = await worker.fetch('/teams/1k')
    expect(resp).toBeDefined()
    if(!resp) return
  
    const team = await resp.json()

    expect(team).toHaveProperty('id')
    expect(team).toHaveProperty('name')
    expect(team).toHaveProperty('image')
    expect(team).toHaveProperty('url')
    expect(team).toHaveProperty('presidentId')
    expect(team).toHaveProperty('channel')
    expect(team).toHaveProperty('coach')
    expect(team).toHaveProperty('socialNetworks')
    expect(team).toHaveProperty('players')
  })

  it('Get /teams/noexist should return 404 message missing team', async () => {
    const resp = await worker.fetch('/teams/noexist')
    expect(resp).toBeDefined()
    if(!resp) return
    
    const errorMessage = await resp.json()

    expect(errorMessage).toEqual({
      message: 'Team not found'
    })
  })
})
