import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function estoniaLithuaniaParser(code: string): ParsedDate | null {
	if (!isValidChecksum(code)) {
		return null
	}

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

function isValidChecksum(code: string): boolean {
	const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1]
	const weights2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3]
	let checksum = 0
	let total = 0

	for (let i = 0; i < 10; ++i) {
		total += Number(code.charAt(i)) * weights1[i]
	}
	checksum = total % 11

	total = 0
	if (checksum === 10) {
		for (let i = 0; i < 10; ++i) {
			total += Number(code.charAt(i)) * weights2[i]
		}
		checksum = total % 11

		if (10 === checksum) {
			checksum = 0
		}
	}

	return checksum === Number(code[10])
}
