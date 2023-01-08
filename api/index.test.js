import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

const setup = async () => {
	const worker = await unstableDev('api/index.js', {}, { disableExperimentalWarning: true })
	return worker
}

const teardown = async (worker) => {
	await worker.stop()
}

/**
 *
 * @param {*} subject Object to validate
 * @param {[{name: string, type: string}]} schema Properties schema
 */
function checkProperties(subject, schema) {
	schema.forEach((property) => {
		const { name, type } = property

		expect(subject).toHaveProperty(property.name)
		if (type) expect(subject[name]).toBeTypeOf(type)
	})
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

	it('should filter presidents by team using the "team" parameter', async () => {
		const resp = await worker.fetch('/presidents?team=1k')
		expect(resp).toBeDefined()

		const presidents = await resp.json()
		expect(presidents).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					teamId: '1k'
				})
			])
		)
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
		expect(days).toHaveLength(11)
	})

	it('Days should have their date and matches', async () => {
		const resp = await worker.fetch('/schedule')
		const days = await resp.json()
		const properties = ['date', 'matches']

		days.forEach((day) => {
			properties.forEach((property) => {
				expect(day).toHaveProperty(property)
			})
		})
	})

	it('Matches should have all their properties', async () => {
		const resp = await worker.fetch('/schedule')
		const days = await resp.json()
		const matches = days.map((day) => day.matches).flat()
		const properties = ['timestamp', 'hour', 'teams', 'score']

		matches.forEach((match) => {
			properties.forEach((property) => {
				expect(match).toHaveProperty(property)
			})
		})

		it('Should return a 405 status code for invalid request method', async () => {
			const resp = await worker.fetch('/schedule', { method: 'POST' })
			expect(resp).toBeDefined()
			expect(resp.status).toBe(405)
		})

		it('Should return a 400 status code for missing or invalid query parameters', async () => {
			const resp = await worker.fetch('/schedule?sort=invalid')
			expect(resp).toBeDefined()
			expect(resp.status).toBe(400)
		})

		it('Should return an empty array when there are no matches scheduled', async () => {
			await worker.fetch('/matches', { method: 'DELETE' })

			const resp = await worker.fetch('/schedule')
			expect(resp).toBeDefined()

			const days = await resp.json()
			expect(days).toEqual([])
		})

		it('Should return the matches sorted by timestamp', async () => {
			const resp = await worker.fetch('/schedule')
			expect(resp).toBeDefined()

			const days = await resp.json()
			const matches = days.map((day) => day.matches).flat()

			expect(matches).toBeSorted((a, b) => a.timestamp - b.timestamp)
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

		const properties = ['id', 'name', 'shortName']

		teams.forEach((team) => {
			properties.forEach((property) => {
				expect(team).toHaveProperty(property)
			})
		})
	})
})

describe('Testing /leaderboard route', () => {
	let worker

	const entryProperties = [
		'wins',
		'losses',
		'scoredGoals',
		'concededGoals',
		'yellowCards',
		'redCards',
		'team',
		'rank'
	]

	const nestedTeamProperties = [
		'color',
		'id',
		'name',
		'image',
		'imageWhite',
		'url',
		'channel',
		'socialNetworks',
		'players',
		'coach',
		'shortName',
		'coachInfo',
		'president'
	]

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	it('Should return 12 teams', async () => {
		const resp = await worker.fetch('/leaderboard')
		expect(resp).toBeDefined()

		const leaderboard = await resp.json()
		expect(leaderboard).toHaveLength(12)
	})

	it('Entries should have all their properties', async () => {
		const resp = await worker.fetch('/leaderboard')
		const leaderboard = await resp.json()

		leaderboard.forEach((entry) => {
			entryProperties.forEach((property) => {
				expect(entry).toHaveProperty(property)
			})
		})
	})

	it('Teams should have all their properties', async () => {
		const resp = await worker.fetch('/leaderboard')
		const leaderboard = await resp.json()
		const teams = leaderboard.map((entry) => entry.team)

		teams.forEach((team) => {
			nestedTeamProperties.forEach((property) => {
				expect(team).toHaveProperty(property)
			})
		})
	})

	it('Shoud return a team from its id', async () => {
		const resp = await worker.fetch('/leaderboard/1k')
		expect(resp).toBeDefined()
		const entry = await resp.json()
		const { team } = entry

		entryProperties.forEach((property) => expect(entry).toHaveProperty(property))
		nestedTeamProperties.forEach((property) => expect(team).toHaveProperty(property))
	})

	it("Should return 404 message when the id doesn't exists", async () => {
		const resp = await worker.fetch('/leaderboard/midudev')
		expect(resp).toBeDefined()
		const errorMessage = await resp.json()

		expect(errorMessage).toEqual({
			message: 'Team not found'
		})
	})

it('Should return a reasonable number of teams for a large number of teams', async () => {
	// Add a large number of teams to the database
	const teams = []
	for (let i = 0; i < 1000; i += 1) {
		teams.push({
			id: `team-${i}`,
			name: `Team ${i}`,
			wins: i,
			losses: 1000 - i,
			scoredGoals: i * 10,
			concededGoals: (1000 - i) * 10,
			yellowCards: i,
			redCards: 0,
			rank: i + 1,
			team: {
				id: `team-${i}`,
				name: `Team ${i}`,
				image: '',
				imageWhite: '',
				url: '',
				channel: '',
				socialNetworks: {},
				players: [],
				coached: '',
				shortName: '',
				coachInfo: '',
				president: ''
			}
		})
	}
	await worker.fetch('/teams', {
		method: 'POST',
		body: JSON.stringify(teams)
	})

	const resp = await worker.fetch('/leaderboard')
	expect(resp).toBeDefined()

	const leaderboard = await resp.json()
	expect(leaderboard.length).toBeLessThanOrEqual(100)
})

	it('Teams should be ordered by rank, with tiebreakers applied', async () => {
		const resp = await worker.fetch('/leaderboard')
		const leaderboard = await resp.json()

		let prevRank = leaderboard[0].rank
		let prevWins = leaderboard[0].wins
		let prevScoredGoals = leaderboard[0].scoredGoals
		for (let i = 1; i < leaderboard.length; i += 1) {
			const entry = leaderboard[i]
			if (entry.rank > prevRank) {
				prevRank = entry.rank
				prevWins = entry.wins
				prevScoredGoals = entry.scoredGoals
			} else if (entry.rank === prevRank) {
				if (entry.wins < prevWins) {
					throw new Error('Teams are not ordered by wins')
				} else if (entry.wins === prevWins) {
					if (entry.scoredGoals < prevScoredGoals) {
						throw new Error('Teams are not ordered by scored goals')
					}
				}
				prevWins = entry.wins
				prevScoredGoals = entry.scoredGoals
			} else {
				throw new Error('Teams are not ordered by rank')
			}
		}
	})
})

describe('Testing /players-12 route', () => {
	let worker

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	it('Players should have all their properties', async () => {
		const resp = await worker.fetch('/players-12')
		expect(resp).toBeDefined()

		const players = await resp.json()
		const playerProperties = ['role', 'firstName', 'lastName', 'image', 'name', 'id', 'team']

		players.forEach((player) =>
			playerProperties.forEach((property) => {
				expect(player).toHaveProperty(property)
			})
		)
	})

	it('Nested teams should have all their properties', async () => {
		const resp = await worker.fetch('/players-12')
		const players = await resp.json()

		const teams = players.map((player) => player.team)
		const nestedTeamProperties = [
			{ name: 'id', type: 'string' },
			{ name: 'name', type: 'string' },
			{ name: 'image', type: 'string' },
			{ name: 'imageWhite', type: 'string' }
		]

		teams.forEach((team) =>
			nestedTeamProperties.forEach((property) => {
				const { name, type } = property
				expect(team).toHaveProperty(name)
				expect(team[name]).toBeTypeOf(type)
			})
		)
	})
})

describe('Testing statistic routes', () => {
	let worker

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	const playersProperties = [
		{ name: 'rank', type: 'number' },
		{ name: 'playerName', type: 'string' },
		{ name: 'gamesPlayed', type: 'number' },
		{ name: 'team', type: 'string' },
		{ name: 'image', type: 'string' }
	]

	it('/top-scorers endpoint shoud return players with all their properties', async () => {
		const resp = await worker.fetch('/top-scorers')
		expect(resp).toBeDefined()

		const players = await resp.json()
		const scorerProperties = [...playersProperties, { name: 'goals', type: 'number' }]
		players.forEach((player) => checkProperties(player, scorerProperties))
	})

	it('/top-assists endpoint should return players with all their properties', async () => {
		const resp = await worker.fetch('/top-assists')
		expect(resp).toBeDefined()

		const players = await resp.json()
		const assisterProperties = [...playersProperties, { name: 'assists', type: 'number' }]
		players.forEach((player) => checkProperties(player, assisterProperties))
	})

	it('/mvp endpoint should return players with all their properties', async () => {
		const resp = await worker.fetch('/mvp')
		expect(resp).toBeDefined()

		const players = await resp.json()
		const mvpsProperties = [...playersProperties, { name: 'mvps', type: 'number' }]
		players.forEach((player) => checkProperties(player, mvpsProperties))
	})
})
