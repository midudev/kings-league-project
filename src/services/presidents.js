import { apiURL } from './config.js'

export const findPresidentBy = async ({ id }) => {
	try {
		const response = await fetch(`${apiURL}/presidents/${id}`)
		const president = await response.json()
		return president
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
