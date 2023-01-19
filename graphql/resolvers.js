import leaderboardService from 'services/leaderboardService'
import teamService from 'services/teamService'
import playerService from 'services/playerService'
import presidentService from 'services/presidentService'
import coachService from 'services/coachService'
import statisticService from 'services/statisticService'
import scheduleService from 'services/scheduleService'

const resolvers = () => {
	return {
		leaderBoard: () => {
			return leaderboardService.getLeaderBoard()
		},
		leaderBoardByTeam: (args) => {
			return leaderboardService.getLeaderBoardByTeam(args)
		},
		teams: () => {
			return teamService.getListTeams()
		},
		team: (args) => {
			return teamService.getTeamById(args)
		},
		twelvePlayers: () => {
			return playerService.getListTwelvePlayers()
		},
		twelvePlayersByTeam: (args) => {
			return playerService.getTwelvePlayersByTeam(args)
		},
		playerByTeam: (args) => {
			return playerService.getPlayerByTeam(args)
		},
		presidents: () => {
			return presidentService.getListPresidents()
		},
		president: (args) => {
			return presidentService.getPresidentById(args)
		},
		coaches: () => {
			return coachService.getListCoaches()
		},
		coachByTeam: (args) => {
			return coachService.getCoachByTeam(args)
		},
		topStatistics: () => {
			return statisticService.getListTopStatistics()
		},
		topAssists: () => {
			return statisticService.getListTopAssists()
		},
		topAssistByRanking: (args) => {
			return statisticService.getTopAssistByRanking(args)
		},
		topScorers: () => {
			return statisticService.getListTopScorers()
		},
		topScorerByRanking: (args) => {
			return statisticService.getTopScorerByRanking(args)
		},
		mvps: () => {
			return statisticService.getListMvp()
		},
		schedule: () => {
			return scheduleService.getListSchedule()
		}
	}
}

export default resolvers
