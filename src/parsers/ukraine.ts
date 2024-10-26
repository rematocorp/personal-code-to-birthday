import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function ukrainianParser(code: string): ParsedDate | null {
	if (!isValidChecksum(code)) {
		return null
	}

	// The first 5 digits represent the number of days since 31-12-1899
	const daysSinceBaseDate = parseInt(code.slice(0, 5), 10)
	const baseDate = new Date(1899, 11, 31) // Dec 31, 1899

	// Calculate the birthdate from the number of days since the base date
	const birthDate = new Date(baseDate.getTime() + daysSinceBaseDate * 24 * 60 * 60 * 1000)

	const day = birthDate.getDate()
	const month = birthDate.getMonth() + 1 // getMonth is zero-based
	const year = birthDate.getFullYear()

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// https://uk.m.wikipedia.org/wiki/%D0%A0%D0%B5%D1%94%D1%81%D1%82%D1%80%D0%B0%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80_%D0%BE%D0%B1%D0%BB%D1%96%D0%BA%D0%BE%D0%B2%D0%BE%D1%97_%D0%BA%D0%B0%D1%80%D1%82%D0%BA%D0%B8_%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B8%D0%BA%D0%B0_%D0%BF%D0%BE%D0%B4%D0%B0%D1%82%D0%BA%D1%96%D0%B2
function isValidChecksum(code: string): boolean {
	const digits = code.slice(0, 9).split('').map(Number)

	const weights = [-1, 5, 7, 9, 4, 6, 10, 5, 7]
	const controlSum = digits.reduce((sum, digit, index) => sum + digit * weights[index], 0)

	let controlNumber = controlSum % 11

	if (controlNumber === 10) {
		controlNumber = 0
	}

	return controlNumber === parseInt(code[9], 10)
}
