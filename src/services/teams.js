export const getAllTeams = async () => {
	try {
		const response = await fetch('https://api.kingsleague.dev/teams')
		const teams = await response.json()
		return teams
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return []
	}
}
