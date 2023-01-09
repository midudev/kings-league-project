import { apiURL } from './config.js'
import { getAllTeams } from './teams.js'
export const getSchedule = async () => {
	try {
		const scheduleResponse = await fetch(`${apiURL}/schedule`)
		const schedule = await scheduleResponse.json()

		// Get the team id and name to create the "page" field
		const teamsResponse = await getAllTeams()
		const teamsMap = teamsResponse.map((team) => {
			const { id, name } = team
			return { id, name }
		})

		// Populate the teams with the "url" attribute
		const populatedSchedule = schedule.map((day) => {
			const matches = day.matches.map((match) => {
				const { teams } = match

				const populatedTeams = teams.map((team) => {
					const mapEntry = teamsMap.find((entry) => entry.name === team.name)
					return { ...team, page: mapEntry.id }
				})

				return { ...match, teams: populatedTeams }
			})

			return { ...day, matches }
		})

		return populatedSchedule
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
