import { TEAMS } from '../db/index.js'

export async function getURLTeams($) {
	/*
		Las url de la informacion de cada equipo tiene siempre
		el patron de la url base 'https://kingsleague.pro/team/'
		añadiendole el id del equipo.

		Se generan siguiendo este patron de las url de la pagina
		oficial.
	*/
	return TEAMS.map((team) => {
		return {
			...team,
			url: `https://kingsleague.pro/team/${team.id}/`
		}
	})
}
