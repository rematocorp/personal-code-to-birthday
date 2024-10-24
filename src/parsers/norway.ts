import { ParsedDate } from '../types'
import { isValidDate } from '../utils'

export default function norwayParser(code: string): ParsedDate | null {
	if (!isValidChecksum(code)) {
		return null
	}

	const day = parseInt(code.slice(0, 2), 10)
	const month = parseInt(code.slice(2, 4), 10)
	let year = parseInt(code.slice(4, 6), 10)

	const centuryMarker = parseInt(code.slice(6, 7), 10)

	// Read more https://en.wikipedia.org/wiki/National_identity_number_(Norway)#Numerical_components
	if (centuryMarker <= 4 || centuryMarker === 9) {
		year += year >= 40 ? 1900 : 2000
	} else if (centuryMarker >= 5 && centuryMarker <= 8) {
		year += 2000
	}

	if (!isValidDate(day, month, year)) {
		return null
	}

	return { day, month, year }
}

// Function to validate the check digits of a Norwegian personal code
function isValidChecksum(code: string): boolean {
	const weights1 = [3, 7, 6, 1, 8, 9, 4, 5, 2] // Weights for the first checksum
	const weights2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2] // Weights for the second checksum, including first checksum

	// Extract the first 9 digits for checksum calculation
	const digits = code.substring(0, 9).split('').map(Number)

	// Extract the check digits provided in the input
	const providedFirstCheckDigit = parseInt(code[9], 10)
	const providedSecondCheckDigit = parseInt(code[10], 10)

	// First checksum calculation
	const sum1 = digits.reduce((sum, digit, index) => sum + digit * weights1[index], 0)
	let firstCheckDigit = 11 - (sum1 % 11)
	if (firstCheckDigit === 11) {
		firstCheckDigit = 0 // Handle special case where remainder is 11
	}
	if (firstCheckDigit === 10) {
		return false // Invalid first check digit
	}

	// Add the first check digit for the second checksum calculation
	const digitsWithFirstCheck = [...digits, firstCheckDigit]

	// Second checksum calculation
	const sum2 = digitsWithFirstCheck.reduce((sum, digit, index) => sum + digit * weights2[index], 0)
	let secondCheckDigit = 11 - (sum2 % 11)
	if (secondCheckDigit === 11) {
		secondCheckDigit = 0 // Handle special case where remainder is 11
	}
	if (secondCheckDigit === 10) {
		return false // Invalid second check digit
	}

	return firstCheckDigit === providedFirstCheckDigit && secondCheckDigit === providedSecondCheckDigit
}
