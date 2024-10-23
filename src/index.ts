import denmarkParser from './parsers/denmark'
import estoniaLithuaniaParser from './parsers/estoniaLithuania'
import finlandParser from './parsers/finland'
import latviaParser from './parsers/latvia'
import norwayParser from './parsers/norway'
import swedenParser from './parsers/sweden'
import { ParsedDate } from './types'

export default function personalCodeToBirthday(code: string): ParsedDate | null {
	if (/^\d{11}$/.test(code)) {
		// Could be Estonia, Lithuania, or Norway
		const birthday = estoniaLithuaniaParser(code)
		if (birthday) {
			return birthday
		}

		return norwayParser(code)
	} else if (/^\d{6}-\d{5}$/.test(code)) {
		return latviaParser(code)
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
