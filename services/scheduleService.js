import schedule from 'db/schedule.json'

class ScheduleService {
	getListSchedule = () => {
		return schedule
	}
}

const scheduleService = new ScheduleService()
export default scheduleService
