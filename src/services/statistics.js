import { apiURL } from './config.js'

export const getTopScorers = async () => {
	try {
		const response = await fetch(`${apiURL}/top-scorers`)
		const topScorers = await response.json()
		return topScorers
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}

export const getTopAssists = async () => {
	try {
		const response = await fetch(`${apiURL}/top-assists`)
		const topAssists = await response.json()
		return topAssists
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}

export const getMVPs = async () => {
	try {
		const response = await fetch(`${apiURL}/mvp`)
		const mvps = await response.json()
		return mvps
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}

export const getTopStatistics = async () => {
	try {
		const response = await fetch(`${apiURL}/top-statistics`)
		const topStatistics = await response.json()
		return topStatistics
	} catch (e) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
