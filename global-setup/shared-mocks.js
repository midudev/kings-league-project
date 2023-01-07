import { vi } from 'vitest'
import { writeDBFile } from '../db/index'

/**
 * the mock for writeDBFile will prevent accidental
 * writes on db files while testing
 */
export default async function () {
	vi.mock('../db/index.js', async (importActual) => {
		const actual = await vi.importActual('../db/index.js')
		return {
			...actual,
			writeDBFile: (file, data) => {
				console.log(`saving...`)
			}
		}
	})
	await sleep(25)
}
