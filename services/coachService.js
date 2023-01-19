import coaches from 'db/coaches.json'
import teams from 'db/teams.json'

class CoachService {
	getListCoaches = () => {
		return coaches
	}

	getCoachByTeam = ({ teamId }) => {
		const teamName = teams.find((team) => team.id === teamId)?.name
		const foundedCoach = coaches.find((coach) => coach.teamName === teamName)
		return foundedCoach
	}
}

const coachService = new CoachService()
export default coachService
