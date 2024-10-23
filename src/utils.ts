export function isValidDate(day: number, month: number, year: number): boolean {
	const date = new Date(year, month - 1, day) // month is zero-indexed in JS Date

	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}
