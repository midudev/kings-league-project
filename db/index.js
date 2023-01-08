import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './db/')

export function readDBFile(dbName) {
	return readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse)
}

export const TEAMS = await readDBFile('teams')
export const PRESIDENTS = await readDBFile('presidents')

export function writeDBFile(dbName, data) {
	return writeFile(`${DB_PATH}/${dbName}.json`, JSON.stringify(data, null, 2), 'utf-8')
}

export function getImageFromTeam({ name }) {
	const { image } = TEAMS.find((team) => team.name === name)
	return image
}
