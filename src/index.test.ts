import personalCodeToBirthday from './index'

describe('valid codes', () => {
	test('Estonia', () => {
		expect(personalCodeToBirthday('39309262754')).toEqual({ day: 26, month: 9, year: 1993 })
		expect(personalCodeToBirthday('49111012217')).toEqual({ day: 1, month: 11, year: 1991 })
		expect(personalCodeToBirthday('30001010060')).toEqual({ day: 1, month: 1, year: 1900 })
		expect(personalCodeToBirthday('62305060020')).toEqual({ day: 6, month: 5, year: 2023 })
	})

	test('Latvia', () => {
		expect(personalCodeToBirthday('240860-28074')).toEqual({ day: 24, month: 8, year: 1960 })
		expect(personalCodeToBirthday('071023-38935')).toEqual({ day: 7, month: 10, year: 2023 })
		expect(personalCodeToBirthday('240860-20090')).toEqual({ day: 24, month: 8, year: 1960 })
	})

	test('Lithuania', () => {
		expect(personalCodeToBirthday('39905280216')).toEqual({ day: 28, month: 5, year: 1999 })
	})

	test('Finland', () => {
		expect(personalCodeToBirthday('101085-7001')).toEqual({ day: 10, month: 10, year: 1985 })
		expect(personalCodeToBirthday('150752-308N')).toEqual({ day: 15, month: 7, year: 1952 })
		expect(personalCodeToBirthday('010100A123D')).toEqual({ day: 1, month: 1, year: 2000 })
	})

	test('Sweden', () => {
		expect(personalCodeToBirthday('8112289874')).toEqual({ day: 28, month: 12, year: 1981 })
		expect(personalCodeToBirthday('811228-9874')).toEqual({ day: 28, month: 12, year: 1981 })
		expect(personalCodeToBirthday('670919-9530')).toEqual({ day: 19, month: 9, year: 1967 })
		expect(personalCodeToBirthday('230919-9533')).toEqual({ day: 19, month: 9, year: 2023 })
		expect(personalCodeToBirthday('196709199530')).toEqual({ day: 19, month: 9, year: 1967 })
		expect(personalCodeToBirthday('19670919-9530')).toEqual({ day: 19, month: 9, year: 1967 })
		expect(personalCodeToBirthday('20230919-9533')).toEqual({ day: 19, month: 9, year: 2023 })
	})

	test('Norway', () => {
		expect(personalCodeToBirthday('10021559844')).toEqual({ day: 10, month: 2, year: 2015 })
		expect(personalCodeToBirthday('100215 59844')).toEqual({ day: 10, month: 2, year: 2015 })
		expect(personalCodeToBirthday('10028439895')).toEqual({ day: 10, month: 2, year: 1984 })
		expect(personalCodeToBirthday('27081439368')).toEqual({ day: 27, month: 8, year: 2014 })
	})

	test('Denmark', () => {
		expect(personalCodeToBirthday('070589-8901')).toEqual({ day: 7, month: 5, year: 1989 })
		expect(personalCodeToBirthday('230309-4456')).toEqual({ day: 23, month: 3, year: 2009 })
		expect(personalCodeToBirthday('050384-4567')).toEqual({ day: 5, month: 3, year: 1984 })
		expect(personalCodeToBirthday('230309-3020')).toEqual({ day: 23, month: 3, year: 1909 })
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

	test('Romania', () => {
		expect(personalCodeToBirthday('1900101220018')).toEqual({ day: 1, month: 1, year: 1990 })
		expect(personalCodeToBirthday('6010303275841')).toEqual({ day: 3, month: 3, year: 2001 })
		expect(personalCodeToBirthday('2990721275847')).toEqual({ day: 21, month: 7, year: 1999 })
	})
})

describe('invalid personal code', () => {
	test('Estonia', () => {
		expect(personalCodeToBirthday('39911025555')).toBeNull()
		expect(personalCodeToBirthday('39913035552')).toBeNull()
	})

	test('Latvia', () => {
		expect(personalCodeToBirthday('071023-38934')).toBeNull()
		expect(personalCodeToBirthday('071523-38937')).toBeNull()
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
		expect(personalCodeToBirthday('8112289875')).toBeNull()
		expect(personalCodeToBirthday('8115289871')).toBeNull()
	})

	test('Norway', () => {
		expect(personalCodeToBirthday('32129999999')).toBeNull()
		expect(personalCodeToBirthday('32132811465')).toBeNull()
		expect(personalCodeToBirthday('32112812600')).toBeNull()
	})

	test('Denmark', () => {
		expect(personalCodeToBirthday('999999-1234')).toBeNull()
		expect(personalCodeToBirthday('051484-4569')).toBeNull()
		expect(personalCodeToBirthday('230309-3080')).toBeNull()
	})

	test('Ukraine', () => {
		expect(personalCodeToBirthday('3416105373')).toBeNull()
	})

	test('Poland', () => {
		expect(personalCodeToBirthday('24231012343')).toBeNull()
		expect(personalCodeToBirthday('24234012341')).toBeNull()
	})

	test('Romania', () => {
		expect(personalCodeToBirthday('1980521275840')).toBeNull()
		expect(personalCodeToBirthday('1234567890128')).toBeNull()
	})

	test('unidentified personal code format', () => {
		expect(personalCodeToBirthday('abcd1234')).toBeNull()
	})
})
