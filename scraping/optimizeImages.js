import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { logInfo, logSuccess } from './log.js'

const INPUT_PATH = path.join(process.cwd(), 'assets', 'static', 'players')
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'teams', 'players')

export async function optimizePlayerImages() {
	const files = await readdir(INPUT_PATH)

	const optimizeImage = async (file) => {
		const filePath = path.join(INPUT_PATH, file)
		const outputPath = path.join(OUTPUT_PATH, file.replace('.png', '.webp'))

		logInfo(`Optimizing image: ${file}`)
		await sharp(filePath).webp({ effort: 6 }).toFile(outputPath)
		logSuccess(`Optimized image: ${file}`)
	}

	await Promise.all(files.map(optimizeImage))
}
