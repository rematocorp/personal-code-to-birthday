import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

// Correct old school format is DDMMYY-CXXXX
export default function latviaParser(code: string): ParsedDate | null {
	code = code.replace('-', '')

	if (!isValidChecksum(code)) {
		return null
	}

	const day = parseInt(code.slice(0, 2), 10)
	const month = parseInt(code.slice(2, 4), 10)
	let year = parseInt(code.slice(4, 6), 10)
	const centuryCode = parseInt(code[6], 10)

	if (centuryCode === 3) {
		year += 2000
	} else {
		year += 1900
	}

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// https://en.wikipedia.org/wiki/National_identification_number#Latvia
function isValidChecksum(personalCode: string): boolean {
	const weights = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

	// Convert the first 10 digits to an array of numbers
	const digits = personalCode.substring(0, 10).split('').map(Number)

	// Calculate the weighted sum
	const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0)

	// Calculate the check digit
	let checksum = sum % 11
	if (checksum === 10) {
		checksum = 0 // If modulo result is 10, check digit is 0
	}

	// Return true if the calculated check digit matches the provided check digit
	return checksum === parseInt(personalCode[10], 10)
}
