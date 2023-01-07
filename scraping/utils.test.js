import { cleanText } from './utils'
import { describe, expect, it } from 'vitest'

describe('test utils functions', () => {
	it('removes extra spaces, or breaklines from strings', () => {
		const text = 'this is \nan \texample'
		const cleanedText = cleanText(text)
		expect(cleanedText).toBe('this is an example')
	})

	it('removes everything behind Colon mark :', () => {
		const text = 'name: jhon doe'
		const cleanedText = cleanText(text)
		expect(cleanedText).toBe('jhon doe')
	})
})
