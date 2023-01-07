import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

const setup = async () => {
	const worker = await unstableDev('api/index.js', {}, { disableExperimentalWarning: true })
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
		const res = await worker.fetch()
		expect(res).toBeDefined()
		if (!res) return

		const apiRoutes = await res.json()
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
		if (!resp) return

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
		if (!resp) return

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
		if (!resp) return

		const errorMessage = await resp.json()

		expect(errorMessage).toEqual({
			message: 'Team not found'
		})
	})
})

describe('Testing /presidents route', () => {
	let worker

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	it('should return presidents', async () => {
		const resp = await worker.fetch('/presidents')
		expect(resp).toBeDefined()
		if (!resp) return

		const presidents = await resp.json()
		const numberPresidents = Object.entries(presidents).length

		// verify the team have all props
		presidents.forEach((president) => {
			expect(president).toHaveProperty('id')
			expect(president).toHaveProperty('name')
			expect(president).toHaveProperty('image')
			expect(president).toHaveProperty('teamId')
		})

		expect(numberPresidents).toBe(12)
	})

	it('should return presidente details by id', async () => {
		const resp = await worker.fetch('/presidents/iker-casillas')
		expect(resp).toBeDefined()
		if (!resp) return

		const president = await resp.json()
		const iker = {
			id: 'iker-casillas',
			name: 'Iker Casillas',
			image: 'https://kingsleague.dev/presidents/iker-casillas.webp',
			teamId: '1k'
		}

		expect(president).toHaveProperty('id')
		expect(president).toHaveProperty('name')
		expect(president).toHaveProperty('image')
		expect(president).toHaveProperty('teamId')
		expect(president).toEqual(iker)
	})

	it('should return 404 and message missing team with no exist president', async () => {
		const resp = await worker.fetch('/presidents/noexist')
		expect(resp).toBeDefined()
		if (!resp) return

		const errorMessage = await resp.json()

		expect(errorMessage).toEqual({
			message: 'President not found'
		})
	})
})

describe('Test /schedule route', () => {
	let worker
	beforeAll(async () => {
		worker = await setup()
	})
	afterAll(async () => {
		await teardown(worker)
	})

	it('Should return 11 days', async () => {
		const resp = await worker.fetch('/schedule')
		expect(resp).toBeDefined()
		const days = await resp.json()
		expect(days).toBe(11)
	})

	it('Days should have their date and matches', async () => {
		const resp = await worker.fetch('/schedule')
		const days = await resp.json()
		days.forEach((day) => {
			expect(day).toMatchObject({
				date: expect.any(String),
				matches: expect.any(Array)
			})
		})
	})

	it('Matches should have all their properties', async () => {
		const resp = await worker.fetch('/schedule')
		const days = await resp.json()
		const matches = days.map((day) => day.matches).flat()
		matches.forEach((match) => {
			expect(match).toMatchObject({
				timestamp: expect.any(Number),
				hour: expect.any(String),
				teams: expect.any(Array),
				score: expect.any(String)
			})
		})
	})

	it('Teams should have all their properties', async () => {
		const resp = await worker.fetch('/schedule')
		const days = await resp.json()
		const teams = days
			.map((day) => day.matches)
			.flat()
			.map((match) => match.teams)
			.flat()
		teams.forEach((team) => {
			expect(team).toMatchObject({
				id: expect.any(String),
				name: expect.any(String),
				shortName: expect.any(String)
			})
		})
	})

	it('should return the correct schedule', async () => {
		const resp = await worker.fetch('/schedule')
		const days = await resp.json()
		// Validar que cada día del horario tenga las propiedades esperadas
		days.forEach((day) => {
			expect(day).toMatchObject({
				date: expect.any(String),
				matches: expect.any(Array)
			})
		})
		// Validar que cada partido del horario tenga las propiedades esperadas
		const matches = days.map((day) => day.matches).flat()
		matches.forEach((match) => {
			expect(match).toMatchObject({
				timestamp: expect.any(Number),
				hour: expect.any(String),
				teams: expect.any(Array),
				score: expect.any(String)
			})
		})
		// Validar que cada equipo del horario tenga las propiedades esperadas
		const teams = days
			.map((day) => day.matches)
			.flat()
			.map((match) => match.teams)
			.flat()
		teams.forEach((team) => {
			expect(team).toMatchObject({
				id: expect.any(String),
				name: expect.any(String),
				shortName: expect.any(String)
			})
		})
	})
})
