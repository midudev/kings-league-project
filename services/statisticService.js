import topStatistics from 'db/top_statistics.json'
import topAssists from 'db/top_assists.json'
import topScorers from 'db/top_scorers.json'
import mvp from 'db/mvp.json'

class StatisticService {
	getListTopStatistics = () => {
		return topStatistics
	}

	getListTopAssists = () => {
		return topAssists
	}

	getTopAssistByRanking = ({ ranking }) => {
		const foundAssister = topAssists.find((assister) => assister.rank === ranking)
		return foundAssister
	}

	getListTopScorers = () => {
		return topScorers
	}

	getTopScorerByRanking = ({ ranking }) => {
		const foundScorer = topScorers.find((scorer) => scorer.rank === ranking)
		return foundScorer
	}

	getListMvp = () => {
		return mvp
	}
}

const statisticService = new StatisticService()
export default statisticService
