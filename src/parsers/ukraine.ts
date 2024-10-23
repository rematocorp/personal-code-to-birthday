import { ParsedDate } from '../types'

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

	return { day, month, year }
}

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
