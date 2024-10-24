import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function norwayParser(code: string): ParsedDate | null {
	const day = parseInt(code.slice(0, 2), 10)
	const month = parseInt(code.slice(2, 4), 10)
	let year = parseInt(code.slice(4, 6), 10)

	const individual = parseInt(code.slice(6, 9), 10)

	// Determine century based on individual number and year
	if (individual <= 499 || (individual >= 500 && year >= 40)) {
		year += 1900
	} else if (individual <= 999 && year <= 39) {
		year += 2000
	}

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}
