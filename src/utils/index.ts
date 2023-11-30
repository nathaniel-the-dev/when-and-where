export function getTimezoneString(tz: any) {
	return `(${tz.abbreviation}) ${tz.alternativeName} - ${tz.countryName}`;
}
export function formatTZValue(tz: any) {
	return {
		label: getTimezoneString(tz),
		value: tz.name,
	};
}

export function getTimeUnits(value: any, unit = 'hour') {
	const converter = new Intl.NumberFormat('en-US', {
		style: 'unit',
		unit: unit,
		unitDisplay: 'long',
	});

	return converter.format(value);
}
