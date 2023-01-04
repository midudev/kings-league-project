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

  it('Get / should return endpoints', async () => {
    const resp = await worker.fetch()
    if (resp) {
      const text = await resp.text()
      const endpoints = [
        {
          endpoint: '/leaderboard',
          description: 'Returns Kings League leaderboard'
        },
        { endpoint: '/teams', description: 'Returns Kings League teams' },
        {
          endpoint: '/presidents',
          description: 'Returns Kings League presidents'
        }
      ]

      expect(text).toStrictEqual(JSON.stringify(endpoints))
    }
  })

  it('The lenght should be greater than 0', async () => {
    const resp = await worker.fetch()
    if (resp) {
      const text = await resp.text()
      const lengthEndpoint = Object.entries(text).length
      expect(lengthEndpoint).toBeGreaterThan(0)
    }
  })
})
