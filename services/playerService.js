import playersTwelve from 'db/players_twelve.json'
import teams from 'db/teams.json'

class PlayerService {
	getListTwelvePlayers = () => {
		return playersTwelve
	}

	getTwelvePlayersByTeam = ({ teamId }) => {
		const foundPlayerTwelve = playersTwelve.filter((player) => player.team.id === teamId)
		return foundPlayerTwelve
	}

	getPlayerByTeam = ({ teamId, playerId }) => {
		const foundTeam = teams.find((team) => team.id === teamId)
		if (!foundTeam) return null
		const foundPlayer = foundTeam.players.find((player) => player.id === `${teamId}-${playerId}`)
		return foundPlayer
	}
}

const playerService = new PlayerService()
export default playerService
