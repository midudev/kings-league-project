import { apiURL } from './config.js'

export const getLeaderboard = async () => {
	try {
		const response = await fetch(`${apiURL}/leaderboard`)
		const leaderboard = await response.json()
		return leaderboard
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}

export const findLeaderboardBy = async ({ teamId }) => {
	try {
		const response = await fetch(`${apiURL}/leaderboard/${teamId}`)
		const teamStats = await response.json()
		return teamStats
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
