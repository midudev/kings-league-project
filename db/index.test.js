import { describe, expect, it } from 'vitest'
import { writeDBFile, TEAMS, PRESIDENTS, getImageFromTeam } from './index'

describe('testing db functionality', () => {
	it('saves data to JSON file', () => {
		writeDBFile('dummy', { data: 'dummy' })
	})
	it('teams  and presidents haves values', () => {
		expect(TEAMS).toBeDefined()
		expect(PRESIDENTS).toBeDefined()
	})
	it('returns team image', () => {
		const image = getImageFromTeam({ name: '1K FC' })
		expect(image).toBe('https://api.kingsleague.dev/static/logos/1k.svg')
	})
})
