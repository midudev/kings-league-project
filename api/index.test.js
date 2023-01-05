import { createWorker } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll, assertResponseOk } from 'vitest'

const setup = async () => {
  const worker = await createWorker('api/index.js')
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
    assertResponseOk(resp)
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
    assertResponseOk(resp)
    const teams = await resp.json()
    const numberTeams = Object.entries(teams).length

    // verify the team have all props
    teams.forEach((team) => {
      expect(team).toHaveProperty('id')
      expect(team).toHaveProperty('name')
      expect(team).toHaveProperty('image')
      expect(team).toHaveProperty('coach')
      expect(team).toHaveProperty('socialNetworks')
      expect(team).toHaveProperty('players')
    })

    expect(numberTeams).toBe(12)
  })

  it('Get /teams/1k should return team props', async () => {
    const resp = await worker.fetch('/teams/1k')
    assertResponseOk(resp)
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
    assertResponseOk(resp)
    const errorMessage = await resp.json()

    expect(errorMessage).toEqual({
      message: 'Team not found'
    })
  })
})

describe('Testing /players route', () => {
  let worker

  beforeAll(async () => {
    worker = await setup()
  })

  afterAll(async () => {
    await teardown(worker)
  })

  it('The players should have all players', async () => {
    const resp = await worker.fetch('/players')
    assertResponseOk(resp)
    const players = await resp.json()

    // verify the players have all props
    players.forEach((player) => {
      expect(player).toHaveProperty('name')
      expect(player).toHaveProperty('age')
      expect(player).toHaveProperty('position')
      expect(player).toHaveProperty('team')
      expect(player).toHaveProperty('number')
      expect(player).toHaveProperty('height')
      expect(player).toHaveProperty('weight')
      expect(player).toHaveProperty('college')
      expect(player).toHaveProperty('birthplace')
      expect(player).toHaveProperty('image')
    })
  })
})

describe('Testing /teams/:teamId/players route', () => {
  let worker

  beforeAll(async () => {
    worker = await setup()
  })

  afterAll(async () => {
    await teardown(worker)
  })

  it('The players should belong to the specified team', async () => {
    const teamId = '1k'
    const resp = await worker.fetch(`/teams/${teamId}/players`)
    assertResponseOk(resp)
    const players = await resp.json()

    players.forEach((player) => {
      expect(player.team).toEqual(teamId)
    })
  })
})

describe('Testing /teams/:teamId route', () => {
  let worker

  beforeAll(async () => {
    worker = await setup()
  })

  afterAll(async () => {
    await teardown(worker)
  })

  it('The team should have the specified properties', async () => {
    const teamId = '1k'
    const resp = await worker.fetch(`/teams/${teamId}`)
    assertResponseOk(resp)
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
})

describe('Testing /teams/:teamId/stats route', () => {
  let worker

  beforeAll(async () => {
    worker = await setup()
  })

  afterAll(async () => {
    await teardown(worker)
  })

  it('The stats should have the specified properties', async () => {
    const teamId = '1k'
    const resp = await worker.fetch(`/teams/${teamId}/stats`)
    assertResponseOk(resp)
    const stats = await resp.json()

    expect(stats).toHaveProperty('gamesPlayed')
    expect(stats).toHaveProperty('wins')
    expect(stats).toHaveProperty('losses')
    expect(stats).toHaveProperty('winPercentage')
    expect(stats).toHaveProperty('pointsScored')
    expect(stats).toHaveProperty('pointsAllowed')
    expect(stats).toHaveProperty('averagePointsScoredPerGame')
    expect(stats).toHaveProperty('averagePointsAllowedPerGame')
  })
})
