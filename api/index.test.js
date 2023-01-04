import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

describe('Testing / route', () => {
  let worker

  beforeAll(async () => {
    worker = await unstableDev(
      'api/index.js',
      {},
      { disableExperimentalWarning: true }
    )
  })

  afterAll(async () => {
    await worker.stop()
  })

  it('routes should have endpoint and description', async () => {
    const resp = await worker.fetch()
    if (resp) {
      const apiRoutes = await resp.json()
      // verify the response to have the expected format
      apiRoutes.forEach((endpoint) => {
        expect(endpoint).toHaveProperty('endpoint')
        expect(endpoint).toHaveProperty('description')
      })
    }
  })

  it('should return 404 for unknown route', async () => {
    const resp = await worker.fetch('/unknown')
    expect(resp.status).toBe(404)
  })

  it('should return 404 for unknown president', async () => {
    const resp = await worker.fetch('/presidents/unknown')
    const respJson = await resp.json()
    expect(respJson.message).toBe('President not found')
    expect(resp.status).toBe(404)
  })

  it('should return 404 for unknown team', async () => {
    const resp = await worker.fetch('/teams/unknown')
    const respJson = await resp.json()
    expect(respJson.message).toBe('Team not found')
    expect(resp.status).toBe(404)
  })
})

describe('Testing /teams route', () => {
  let worker

  beforeAll(async () => {
    worker = await unstableDev(
      'api/index.js',
      {},
      { disableExperimentalWarning: true }
    )
  })

  afterAll(async () => {
    await worker.stop()
  })

  it('The teams should have all teams', async () => {
    const resp = await worker.fetch('/teams')
    if (resp) {
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
    }
  })

  it('Get /teams/1k should return team props', async () => {
    const resp = await worker.fetch('/teams/1k')
    if (resp) {
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
    }
  })

  it('Get /teams/noexist should return 404 message missing team', async () => {
    const resp = await worker.fetch('/teams/noexist')
    if (resp) {
      const errorMessage = await resp.json()

      expect(errorMessage).toEqual({
        message: 'Team not found'
      })
    }
  })
})
