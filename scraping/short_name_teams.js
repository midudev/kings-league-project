import { TEAMS } from '../db/index.js'

export function getShortNameTeams() {
	/*
		{
			teamId : shortName
		}
	*/
	const shortNames = {
		'los-troncos-fc': 'TFC',
		'1k': '1K',
		'el-barrio': 'RDB',
		'ultimate-mostoles': 'ULT',
		'saiyans-fc': 'SAI',
		kunisports: 'KNS',
		'jijantes-fc': 'JFC',
		'rayo-barcelona': 'RDB',
		'porcinos-fc': 'POR',
		'xbuyer-team': 'XBU',
		'aniquiladores-fc': 'ANI',
		'pio-fc': 'PIO'
	}

	return TEAMS.map((team) => {
		return {
			...team,
			shortName: shortNames[team.id]
		}
	})
}
