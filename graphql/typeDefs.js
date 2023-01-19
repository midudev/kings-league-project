import { buildSchema } from 'graphql'

const graphTypes = buildSchema(`
	type Query {
		leaderBoard : [Clasification]
		leaderBoardByTeam (teamId:String!) : Clasification
		teams : [Team]
		team (teamId:String!) : Team
		twelvePlayersByTeam (teamId:String!) : [TwelvePlayer]
		playerByTeam (teamId:String!,playerId:String!) : Player
		presidents : [President]
		president (presidentId:String!) : President
		coaches : [Coach]
		coachByTeam (teamId:String!) : Coach
		topStatistics : TopStats
		topAssists : [topAssist]
		topAssistByRanking (ranking:Int!) : topAssist
		topScorers : [topScorer]
		topScorerByRanking (ranking:Int!) : topScorer
		mvps : [MVP]
		schedule : [Schedule]
		twelvePlayers : [TwelvePlayer]
	}

	type Clasification {
		wins : Int!
		losses : Int!
		scoredGoals : Int!
		concededGoals : Int!
		yellowCards : Int!
		redCards : Int!
		rank : Int!
		team : Team!
	}

	type Team {
		id : String!
		color : String!
		name : String!
		image : String!
		imageWhite : String
		url : String!
		presidentId : String!
		channel : String
		socialNetworks : [String]
		shortName : String!
		coach : String!
		coachInfo : Coach!
		president : President
		players : [Player]!
	}

	type Player {
		id : String!
		dorsalName : String!
		fullName : String!
		role : String!
		image : String
		stats : PlayerStats
	}

	type TwelvePlayer {
		role : String!
		firstName : String!
		lastName : String!
		image : String
		name :  String!
		id : String!
		team : TwelvePlayerTeam
	}

	type TwelvePlayerTeam {
		id : String!
		name : String!
		image : String
		imageWhite : String
	}
	
	type PlayerStats {
		speed : Int
		physique : Int
		shooting : Int
		passing : Int
		talent : Int
		defense : Int
		score : Int
	}

	type President {
		id : String!
		name : String!
		image : String
		teamId : String!
	}

	type Coach {		
		name : String!
		teamName : String
		image : String
	}
	
	interface topStatsPlayer {
		playerName : String!
		gamesPlayed : Int!
		rank : Int!
		team : String!
		image : String
		playerImage : String!
		teamId : String!
	}

	type PlayerMVP implements topStatsPlayer {
		playerName : String!
		gamesPlayed : Int!
		rank : Int!
		team : String!
		image : String
		playerImage : String!
		teamId : String!
		mvps : Int!
	}

	type PlayerScorer implements topStatsPlayer {
		playerName : String!
		gamesPlayed : Int!
		rank : Int!
		team : String!
		image : String
		playerImage : String!
		teamId : String!
		goals : Int!
	}

	type PlayerAssist implements topStatsPlayer {
		playerName : String!
		gamesPlayed : Int!
		rank : Int!
		team : String!
		image : String
		playerImage : String!
		teamId : String!
		assists : Int!
	}

	type TopStats {		
		leaderboard : [Clasification]!
		mvp : [PlayerMVP]!
		topScorers : [PlayerScorer]!
		topAssists : [PlayerAssist]!
	}

	type topAssist {		
		playerName : String!
		gamesPlayed : Int!
		assists : Int!
		rank : Int!
		team : String!
		image : String!
	}
	
	type topScorer {		
		playerName : String!
		gamesPlayed : Int!
		goals : Int!
		rank : Int!
		team : String!
		image : String!
	}

	type MVP {		
		playerName : String!
		gamesPlayed : Int!
		mvps : Int!
		rank : Int!
		team : String!
		image : String!
	}

	type Schedule {		
		date : String!
		matches : [Match]!
	}

	type Match {		
		timestamp : String!
		hour : String!
		score : String!
		teams : [MatchTeam]!
	}

	type MatchTeam {		
		id :  String!
		name :  String!
		shortName :  String!
	}
`)

export default graphTypes
