export const findLeaderboardBy = async ({ teamId }) => {
	try {
		const response = await fetch(`https://api.kingsleague.dev/leaderboard/${teamId}`)
		const teamStats = await response.json()
		return teamStats
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
