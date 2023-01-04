import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

describe('Worker', () => {
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
