import denmarkParser from './parsers/denmark'
import estoniaLithuaniaParser from './parsers/estoniaLithuania'
import finlandParser from './parsers/finland'
import latviaParser from './parsers/latvia'
import norwayParser from './parsers/norway'
import polandParser from './parsers/poland'
import swedenParser from './parsers/sweden'
import ukraineParser from './parsers/ukraine'
import { ParsedDate } from './types'

export default function personalCodeToBirthday(code: string): ParsedDate | null {
	if (/^\d{10}$/.test(code)) {
		return ukraineParser(code) || swedenParser(code)
	} else if (/^\d{11}$/.test(code)) {
		return estoniaLithuaniaParser(code) || polandParser(code) || norwayParser(code)
	} else if (/^\d{12}$/.test(code)) {
		return swedenParser(code)
	} else if (/^\d{6}-\d{5}$/.test(code)) {
		return latviaParser(code)
	} else if (/^\d{6}[+-A]\d{3}[A-Za-z]$/.test(code)) {
		return finlandParser(code)
	} else if (/^\d{6}[-]\d{4}$/.test(code)) {
		return finlandParser(code) || swedenParser(code) || denmarkParser(code)
	} else if (/^\d{6}[A]\d{4}$/.test(code)) {
		return finlandParser(code)
	} else if (/^\d{8}[-]\d{4}$/.test(code)) {
		return swedenParser(code)
	}

	return null
}
