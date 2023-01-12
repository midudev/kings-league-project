import { Hono } from 'hono'

import schedule from '../../db/schedule.json'

const scheduleApi = new Hono()

/**
  @api {GET} /schedule Get Schedule
  @apiName GetSchedule
  @apiGroup Schedule
  @apiSuccess {Object[]} Schedule list.
  @apiSuccess {String} schedule.date Schedule date.
  @apiSuccess {Object[]} scheduleMatches.matches List of matches.
  @apiSuccess {String} scheduleMatches.timestamp Match timestamp.
  @apiSuccess {String} scheduleMatches.score Match result.
  @apiSuccess {String} scheduleMatches.hour Match formatted hour.
  @apiSuccess {Object[]} Team list of teams.
  @apiSuccess {String} Team.id Id of Team.
  @apiSuccess {String} Team.name Team name.
  @apiSuccess {String} Team.shortName Team abbreviation.
*/
scheduleApi.get('/', (ctx) => {
	return ctx.json(schedule)
})

export { scheduleApi }
