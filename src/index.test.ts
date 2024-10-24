import personalCodeToBirthday from './index'

describe('valid codes', () => {
	test('Estonia', () => {
		expect(personalCodeToBirthday('39309262754')).toEqual({ day: 26, month: 9, year: 1993 })
		expect(personalCodeToBirthday('49111012217')).toEqual({ day: 1, month: 11, year: 1991 })
		expect(personalCodeToBirthday('30001010060')).toEqual({ day: 1, month: 1, year: 1900 })
		expect(personalCodeToBirthday('62305060020')).toEqual({ day: 6, month: 5, year: 2023 })
	})

	test('Latvia', () => {
		expect(personalCodeToBirthday('050393-12344')).toEqual({ day: 5, month: 3, year: 1993 })
		expect(personalCodeToBirthday('050303-22344')).toEqual({ day: 5, month: 3, year: 2003 })
	})

	test('Lithuania', () => {
		expect(personalCodeToBirthday('39905280216')).toEqual({ day: 28, month: 5, year: 1999 })
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
		expect(personalCodeToBirthday('050305-4567')).toEqual({ day: 5, month: 3, year: 2005 })
		expect(personalCodeToBirthday('050384-1235')).toEqual({ day: 5, month: 3, year: 1984 })
		expect(personalCodeToBirthday('050384-4567')).toEqual({ day: 5, month: 3, year: 1984 })
	})

	test('Ukraine', () => {
		expect(personalCodeToBirthday('3406105372')).toEqual({ day: 3, month: 4, year: 1993 })
		expect(personalCodeToBirthday('3406105350')).toEqual({ day: 3, month: 4, year: 1993 })
	})

	test('Poland', () => {
		expect(personalCodeToBirthday('44051401359')).toEqual({ day: 14, month: 5, year: 1944 })
		expect(personalCodeToBirthday('02070803628')).toEqual({ day: 8, month: 7, year: 1902 })
		expect(personalCodeToBirthday('24231012344')).toEqual({ day: 10, month: 3, year: 2024 })
	})
})

describe('invalid personal code', () => {
	test('Estonia', () => {
		expect(personalCodeToBirthday('39911025555')).toBeNull()
		expect(personalCodeToBirthday('39913035552')).toBeNull()
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
		expect(personalCodeToBirthday('910100A123F')).toBeNull()
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
		expect(personalCodeToBirthday('999999-1234')).toBeNull()
	})

	test('Ukraine', () => {
		expect(personalCodeToBirthday('3406105373')).toBeNull()
	})

	test('Poland', () => {
		expect(personalCodeToBirthday('24231012343')).toBeNull()
		expect(personalCodeToBirthday('24234012341')).toBeNull()
	})

	test('unidentified personal code format', () => {
		expect(personalCodeToBirthday('abcd1234')).toBeNull()
	})
})
