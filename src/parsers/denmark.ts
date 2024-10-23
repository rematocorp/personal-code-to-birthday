import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function denmarkParser(code: string): ParsedDate | null {
	if (code.includes('-')) {
		code = code.replace('-', '')
	}

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

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}
