import * as cheerio from 'cheerio'
import { writeDBFile, TEAMS, PRESIDENTS } from '../db/index.js'

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

async function scrape(url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

async function getLeaderBoard() {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('table tbody tr')

  const LEADERBOARD_SELECTORS = {
    team: { selector: '.fs-table-text_3', typeOf: 'string' },
    wins: { selector: '.fs-table-text_4', typeOf: 'number' },
    loses: { selector: '.fs-table-text_5', typeOf: 'number' },
    scoredGoals: { selector: '.fs-table-text_6', typeOf: 'number' },
    concededGoals: { selector: '.fs-table-text_7', typeOf: 'number' },
    yellowCards: { selector: '.fs-table-text_8', typeOf: 'number' },
    redCards: { selector: '.fs-table-text_9', typeOf: 'number' }
  }

  const getTeamFrom = ({ name }) => {
    const { presidentId, ...restOfTeam } = TEAMS.find(
      (team) => team.name === name
    )
    const president = PRESIDENTS.find(
      (president) => president.id === presidentId
    )
    return { ...restOfTeam, president }
  }

  const cleanText = (text) =>
    text
      .replace(/\t|\n|\s:/g, '')
      .replace(/.*:/g, ' ')
      .trim()

  const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

  const leaderboard = []
  $rows.each((_, el) => {
    const leaderBoardEntries = leaderBoardSelectorEntries.map(
      ([key, { selector, typeOf }]) => {
        const rawValue = $(el).find(selector).text()
        const cleanedValue = cleanText(rawValue)

        const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

        return [key, value]
      }
    )

    const { team: teamName, ...leaderboardForTeam } =
      Object.fromEntries(leaderBoardEntries)
    const team = getTeamFrom({ name: teamName })

    leaderboard.push({
      ...leaderboardForTeam,
      team
    })
  })

  return leaderboard
}

const leaderboard = await getLeaderBoard()

await writeDBFile('leaderboard', leaderboard)
