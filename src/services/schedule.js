import { apiURL } from './config.js'

export const getSchedule = async () => {
	try {
		const response = await fetch(`${apiURL}/schedule`)
		const schedule = await response.json()
		return schedule
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
