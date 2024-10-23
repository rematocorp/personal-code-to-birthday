import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function finlandParser(code: string): ParsedDate | null {
	const day = parseInt(code.slice(0, 2), 10)
	const month = parseInt(code.slice(2, 4), 10)
	const yearSuffix = parseInt(code.slice(4, 6), 10)
	const centuryMarker = code[6]

	let year = yearSuffix

	// Handle the century based on the marker
	if (centuryMarker === '+') {
		year += 1800
	} else if (centuryMarker === '-') {
		year += 1900
	} else if (centuryMarker === 'A') {
		year += 2000
	}

	// Validate the parsed date
	if (!isValidDate(day, month, year)) {
		return null
	}

	if (!isValidFinnishChecksum(code)) {
		return null
	}

	return { day, month, year }
}

function isValidFinnishChecksum(code: string): boolean {
	const validChars = '0123456789ABCDEFHJKLMNPRSTUVWXY'

	const serial = code.slice(0, 6) + code.slice(7, 10)
	const checksum = code[10]
	const num = parseInt(serial, 10)
	const remainder = num % 31
	const expectedChecksum = validChars.charAt(remainder)

	return expectedChecksum === checksum.toUpperCase()
}
