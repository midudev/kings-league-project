import { describe, expect, it } from 'vitest'
import { writeDBFile, TEAMS, PRESIDENTS, getImageFromTeam } from './index'

describe('testing db functionality', () => {
	it('saves data to JSON file', async () => {
		const result = await writeDBFile('dummy', { data: 'dummy' })
		expect(result).toBe(true)
	})
	it('teams  and presidents haves values', () => {
		expect(TEAMS).toBeDefined()
		expect(PRESIDENTS).toBeDefined()
	})
	it('returns team image', () => {
		const image = getImageFromTeam({ name: '1K FC' })
		expect(image).toBe('https://kingsleague.dev/teams/logos/1k.svg')
	})
})
