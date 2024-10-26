import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function denmarkParser(code: string): ParsedDate | null {
	code = code.replace('-', '')

	const day = parseInt(code.slice(0, 2), 10)
	const month = parseInt(code.slice(2, 4), 10)
	let year = parseInt(code.slice(4, 6), 10)
	const centuryIndicator = parseInt(code.slice(6, 7), 10)

	// Determine century based on the 7th digit and the year
	if (centuryIndicator >= 0 && centuryIndicator <= 3) {
		year += 1900
	} else if (centuryIndicator >= 4 && centuryIndicator <= 9) {
		if (year >= 0 && year <= 36) {
			year += 2000
		} else {
			year += 1900
		}
	}

	// Checksum was dropped in 2007
	// https://en.wikipedia.org/wiki/Personal_identification_number_(Denmark)#New_development_in_2007
	if (year < 2007 && !isValidChecksum(code)) {
		return null
	}

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// https://en.gs1.dk/radgivning/beregn-dit-kontrolciffer
function isValidChecksum(code: string): boolean {
	const weights = [4, 3, 2, 7, 6, 5, 4, 3, 2] // Weights for the first 9 digits

	// Convert the first 9 digits to an array of numbers
	const digits = code.substring(0, 9).split('').map(Number)

	// Calculate the weighted sum
	const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0)

	// Calculate the check digit (modulo 11)
	const checksum = sum % 11 === 0 ? 0 : 11 - (sum % 11)

	// If the modulo result is 10, it's considered invalid (CPR could not use this number)
	if (checksum === 10) {
		return false
	}

	return checksum === parseInt(code[9], 10)
}
