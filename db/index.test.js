import { describe, expect, it } from 'vitest'
import { writeDBFile, TEAMS, PRESIDENTS, getImageFromTeam } from './index'

describe('testing db functionality', () => {
	it('saves data to JSON file', () => {
		writeDBFile('dummy', { data: 'dummy' })
	})
	it('teams and presidents have values', () => {
		expect(TEAMS).toBeDefined()
		expect(PRESIDENTS).toBeDefined()
	})
	it('returns correct team image', () => {
		const image = getImageFromTeam({ name: '1K FC' })
		expect(image).toBe('https://api.kingsleague.dev/static/logos/1k.svg')
	})
	it('returns default image for unknown team', () => {
		const image = getImageFromTeam({ name: 'Unknown Team' })
		expect(image).toBe('https://api.kingsleague.dev/static/logos/default.svg')
	})
})

