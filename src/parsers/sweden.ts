import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function swedenParser(code: string): ParsedDate | null {
	const year = parseInt(code.slice(0, 4), 10)
	const month = parseInt(code.slice(4, 6), 10)
	const day = parseInt(code.slice(6, 8), 10)

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}
