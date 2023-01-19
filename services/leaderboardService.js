import leaderboard from 'db/leaderboard.json'

class LeaderBoardService {
	getLeaderBoard = () => {
		return leaderboard
	}

	getLeaderBoardByTeam = ({ teamId }) => {
		const foundLeaderBoardTeam = leaderboard.find((stats) => stats.team.id === teamId)
		return foundLeaderBoardTeam
	}
}

const leaderBoardService = new LeaderBoardService()
export default leaderBoardService
