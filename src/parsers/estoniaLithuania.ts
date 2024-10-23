import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function estoniaLithuaniaParser(code: string): ParsedDate | null {
	const centuryCode = parseInt(code[0], 10)
	const day = parseInt(code.slice(5, 7), 10)
	const month = parseInt(code.slice(3, 5), 10)
	let year = parseInt(code.slice(1, 3), 10)

	if (centuryCode === 3 || centuryCode === 4) {
		year += 1900
	}
	if (centuryCode === 5 || centuryCode === 6) {
		year += 2000
	}

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}
