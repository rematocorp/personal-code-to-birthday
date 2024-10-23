import personalCodeToBirthday from './index'

describe('valid codes', () => {
	test('Estonia', () => {
		expect(personalCodeToBirthday('39405280299')).toEqual({ day: 28, month: 5, year: 1994 })
		expect(personalCodeToBirthday('60105280299')).toEqual({ day: 28, month: 5, year: 2001 })
	})

	test('Latvia', () => {
		expect(personalCodeToBirthday('050393-12344')).toEqual({ day: 5, month: 3, year: 1993 })
		expect(personalCodeToBirthday('050303-22344')).toEqual({ day: 5, month: 3, year: 2003 })
	})

	test('Lithuania', () => {
		expect(personalCodeToBirthday('39905280217')).toEqual({ day: 28, month: 5, year: 1999 })
	})

	test('Finland', () => {
		expect(personalCodeToBirthday('101085-7001')).toEqual({ day: 10, month: 10, year: 1985 })
		expect(personalCodeToBirthday('101085+789W')).toEqual({ day: 10, month: 10, year: 1885 })
		expect(personalCodeToBirthday('150752-308N')).toEqual({ day: 15, month: 7, year: 1952 })
		expect(personalCodeToBirthday('010100A123D')).toEqual({ day: 1, month: 1, year: 2000 })
	})

	test('Sweden', () => {
		expect(personalCodeToBirthday('199001011234')).toEqual({ day: 1, month: 1, year: 1990 })
	})

	test('Norway', () => {
		expect(personalCodeToBirthday('01020352345')).toEqual({ day: 1, month: 2, year: 2003 })
	})

	test('Denmark', () => {
		expect(personalCodeToBirthday('0503054567')).toEqual({ day: 5, month: 3, year: 2005 })
		expect(personalCodeToBirthday('0503841235')).toEqual({ day: 5, month: 3, year: 1984 })
		expect(personalCodeToBirthday('050384-1235')).toEqual({ day: 5, month: 3, year: 1984 })
		expect(personalCodeToBirthday('0503844567')).toEqual({ day: 5, month: 3, year: 1984 })
	})
})

describe('invalid personal code', () => {
	test('Estonia', () => {
		const result = personalCodeToBirthday('39913025555')
		expect(result).toBeNull()
	})

	test('Latvia', () => {
		expect(personalCodeToBirthday('123456-12345')).toBeNull()
	})

	test('Lithuania', () => {
		expect(personalCodeToBirthday('99905280217')).toBeNull()
	})

	test('Finland', () => {
		expect(personalCodeToBirthday('999999A123T')).toBeNull()
		expect(personalCodeToBirthday('131052Z3087')).toBeNull()
		expect(personalCodeToBirthday('321052A3087')).toBeNull()
	})

	test('Sweden', () => {
		expect(personalCodeToBirthday('1990010123456')).toBeNull()
		expect(personalCodeToBirthday('199013011234')).toBeNull()
		expect(personalCodeToBirthday('199001341234')).toBeNull()
	})

	test('Norway', () => {
		expect(personalCodeToBirthday('32129999999')).toBeNull()
	})

	test('Denmark', () => {
		expect(personalCodeToBirthday('9999991234')).toBeNull()
	})

	test('unsupported personal code format', () => {
		const result = personalCodeToBirthday('abcd1234')
		expect(result).toBeNull()
	})
})
