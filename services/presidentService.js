import presidents from 'db/presidents.json'

class PlayerService {
	getListPresidents = () => {
		return presidents
	}

	getPresidentById = ({ presidentId }) => {
		const foundPresident = presidents.find((president) => president.id === presidentId)
		return foundPresident
	}
}

const playerService = new PlayerService()
export default playerService
