import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function polandParser(code: string): ParsedDate | null {
	if (!isValidChecksum(code)) {
		return null
	}

	const day = parseInt(code.slice(4, 6), 10)
	let month = parseInt(code.slice(2, 4), 10)
	let year = parseInt(code.slice(0, 2), 10)

	// Determine the century based on the month encoding
	if (month >= 1 && month <= 12) {
		year += 1900
	} else if (month >= 21 && month <= 32) {
		year += 2000
		month -= 20
	}

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// https://en.wikipedia.org/wiki/PESEL#Checksum_calculation
function isValidChecksum(code: string): boolean {
	const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
	const digits = code.slice(0, 10).split('').map(Number)

	const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0)

	const expectedChecksum = (10 - (sum % 10)) % 10

	return expectedChecksum === parseInt(code[10], 10)
}
