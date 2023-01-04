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
})
