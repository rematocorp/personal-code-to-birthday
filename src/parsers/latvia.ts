import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

// Correct old school format is DDMMYY-CXXXX
export default function latviaParser(code: string): ParsedDate | null {
	const day = parseInt(code.slice(0, 2), 10)
	const month = parseInt(code.slice(2, 4), 10)
	let year = parseInt(code.slice(4, 6), 10)
	const centuryCode = parseInt(code[7], 10)

	// Latvian codes are always from the 20th century, so add 1900
	if (centuryCode === 2) {
		year += 2000
	} else {
		year += 1900
	}

	// Validate the parsed date
	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}
