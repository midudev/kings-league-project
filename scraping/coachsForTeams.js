import * as cheerio from 'cheerio'
import { writeDBFile, TEAMS } from '../db/index.js'

const URLS = {
  coachs: 'https://es.besoccer.com/competicion/info/kings-league/2023'
}

const INFO_COACHS_SELECTORS = {
  teamName: { selector: '.name.mt10', typeOf: 'string' },
  coach: { selector: '.name.mt20', typeOf: 'string' },
  coachImg: { selector: '.player-circle-box', typeOf: 'string' }
}

async function scrape(url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

function replaceFCOfTeamName(teamName) {
  return teamName.replace(' FC', '')
}

async function getCoachsOfTeams() {
  const $ = await scrape(URLS.coachs)
  const coachsTeam = $(INFO_COACHS_SELECTORS.coach.selector)
    .toArray()
    .map((coachName) => coachName.children[0].data)
  const coachsImgTeam = $(INFO_COACHS_SELECTORS.coachImg.selector)
    .toArray()
    .map((coachImg) => {
      const { attribs } = coachImg
      const { src } = attribs
      return src
    })
  const teamsName = $(INFO_COACHS_SELECTORS.teamName.selector)
    .toArray()
    .map((teamName) => teamName.children[0].data)
  const teamsWithCoach = coachsTeam.map((coach, i) => {
    return {
      coach,
      teamName: replaceFCOfTeamName(teamsName[i]),
      coachImg: coachsImgTeam[i]
    }
  })
  return TEAMS.map((team) => {
    const coachInfoTeam = teamsWithCoach.filter((teamWithCoach, i) => {
      const teamWithCoachFormatted = replaceFCOfTeamName(
        teamWithCoach.teamName.toLocaleUpperCase()
      )
      const teamFoundedFormatted = replaceFCOfTeamName(
        team.name.toLocaleUpperCase()
      )
      return teamWithCoachFormatted === teamFoundedFormatted
    })[0]

    return {
      ...team,
      coachInfo: {
        name: coachInfoTeam.coach,
        image: coachInfoTeam.coachImg
      }
    }
  })
}

const teamsInfoWithCoach = await getCoachsOfTeams()

writeDBFile('teams', teamsInfoWithCoach)
