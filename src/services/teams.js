import { apiURL } from './config.js'

export const getAllTeams = async () => {
	try {
		const response = await fetch(`${apiURL}/teams`)
		const teams = await response.json()
		return teams
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return []
	}
}

export const getPlayerTwelveFor = async ({ teamId }) => {
	try {
		const response = await fetch(`${apiURL}/teams/${teamId}/player-12`)
		console.log(`${apiURL}/teams/${teamId}/player-12`)
		const teams = await response.json()
		return teams
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return []
	}
}
