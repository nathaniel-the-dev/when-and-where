export function getTimezoneString(tz: any) {
	return `(${tz.abbreviation}) ${tz.alternativeName} - ${tz.countryName}`;
}
export const formatTZValue = (tz: any) => ({
	label: getTimezoneString(tz),
	value: tz.name,
});
