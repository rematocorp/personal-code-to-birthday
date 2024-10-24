export function isValidDate(day: number, month: number, year: number): boolean {
	const date = new Date(year, month - 1, day) // month is zero-indexed in JS Date

	if (year < 1900 || year > new Date().getFullYear()) {
		return false
	}

	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}
