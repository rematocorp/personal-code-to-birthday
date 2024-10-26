import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function romaniaParser(code: string): ParsedDate | null {
	if (!isValidChecksum(code)) {
		return null
	}

	let year = parseInt(code.slice(1, 3), 10)
	const month = parseInt(code.slice(3, 5), 10)
	const day = parseInt(code.slice(5, 7), 10)
	const gender = parseInt(code[0], 10)

	if (gender === 1 || gender === 2) {
		year += 1900
	} else if (gender === 5 || gender === 6) {
		year += 2000
	}

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// https://github.com/vimishor/cnp-spec/blob/master/spec.md
function isValidChecksum(code: string): boolean {
	const weights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9]
	let sum = 0

	for (let i = 0; i < 12; i++) {
		sum += parseInt(code[i]) * weights[i]
	}

	const checksum = sum % 11 === 10 ? 1 : sum % 11

	return checksum === parseInt(code[12])
}
