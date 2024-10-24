import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function swedenParser(code: string): ParsedDate | null {
	code = code.replace('-', '')

	if (!isValidChecksum(code)) {
		return null
	}

	let year: number
	let month: number
	let day: number

	if (code.length === 12) {
		year = parseInt(code.slice(0, 4), 10)
		month = parseInt(code.slice(4, 6), 10)
		day = parseInt(code.slice(6, 8), 10)
	} else {
		year = parseInt(code.slice(0, 2), 10)
		month = parseInt(code.slice(2, 4), 10)
		day = parseInt(code.slice(4, 6), 10)

		if (new Date().getFullYear() - (1900 + year) > 99) {
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

function isValidChecksum(code: string) {
	// Use the last 9 digits without checksum number
	const digits = code.length === 12 ? code.slice(2, 11) : code.slice(0, 9)

	let sum = 0
	for (let i = 0; i < digits.length; i++) {
		let digit = parseInt(digits[i])

		if (i % 2 === 0) {
			digit *= 2

			if (digit > 9) {
				digit -= 9
			}
		}

		sum += digit
	}
	const expectedChecksum = (10 - (sum % 10)) % 10

	return expectedChecksum === Number(code[code.length - 1])
}
