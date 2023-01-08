import { apiURL } from './config.js'

export const getPlayersTwelve = async () => {
	try {
		const response = await fetch(`${apiURL}/players-12`)
		const players = await response.json()
		return players
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
