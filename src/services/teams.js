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

export const getPlayersTwelveFor = async ({ teamId }) => {
	try {
		const response = await fetch(`${apiURL}/teams/${teamId}/players-12`)
		const players = await response.json()
		return players
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return []
	}
}

export const getAllPlayersTwelve = async () => {
	try {
		const response = await fetch(`${apiURL}/players-12`)
		const players = await response.json()
		return players
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return []
	}
}
