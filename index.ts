interface ParsedDate {
	day: number
	month: number
	year: number
}

export default function personalCodeToBirthday(code: string): ParsedDate | null {
	if (/^\d{11}$/.test(code)) {
		// Could be Estonia, Lithuania, or Norway
		const birthday = estonianLithuanianParser(code)
		if (birthday) {
			return birthday
		}

		return norwayParser(code)
	} else if (/^\d{6}-\d{5}$/.test(code)) {
		return latvianParser(code)
	} else if (/^\d{6}[+-A]\d{3}[A-Za-z]$/.test(code)) {
		return finlandParser(code)
	} else if (/^\d{6}[+-A]\d{4}$/.test(code)) {
		// Could be Finland or Denmark
		const birthday = finlandParser(code)
		if (birthday) {
			return birthday
		}

		return denmarkParser(code)
	} else if (/^\d{12}$/.test(code)) {
		return swedenParser(code)
	} else if (/^\d{10}$/.test(code)) {
		return denmarkParser(code)
	}

	return null
}

// Estonia (EE) and Lithuanian (LT) Parser
function estonianLithuanianParser(code: string): ParsedDate | null {
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

// Latvia (LV) Parser
// Correct old school format is DDMMYY-CXXXX
function latvianParser(code: string): ParsedDate | null {
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

// Finland (FI) Parser
function finlandParser(code: string): ParsedDate | null {
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

// Sweden (SE) Parser
function swedenParser(code: string): ParsedDate | null {
	const year = parseInt(code.slice(0, 4), 10)
	const month = parseInt(code.slice(4, 6), 10)
	const day = parseInt(code.slice(6, 8), 10)

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// Norway (NO) Parser
function norwayParser(code: string): ParsedDate | null {
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

	// Now validate the date after adjusting the century
	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// Denmark (DK) Parser
function denmarkParser(code: string): ParsedDate | null {
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

function isValidDate(day: number, month: number, year: number): boolean {
	const date = new Date(year, month - 1, day) // month is zero-indexed in JS Date

	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}
