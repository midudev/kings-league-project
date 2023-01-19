import teams from 'db/teams.json'

class TeamService {
	getListTeams = () => {
		return teams
	}

	getTeamById = ({ teamId }) => {
		const foundTeam = teams.find((team) => team.id === teamId)
		return foundTeam
	}
}

const teamService = new TeamService()
export default teamService
