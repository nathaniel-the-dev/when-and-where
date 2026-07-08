import type { RawTimeZone } from '@vvo/tzdb';

export function getTimezoneString(tz: RawTimeZone) {
	return `(${tz.abbreviation}) ${tz.alternativeName} - ${tz.countryName}`;
}

export interface SelectOption {
	label: string;
	value: string;
}

export function formatTZValue(tz: RawTimeZone): SelectOption {
	return {
		label: getTimezoneString(tz),
		value: tz.name,
	};
}

export function getTimeUnits(value: number, unit = 'hour') {
	const converter = new Intl.NumberFormat('en-US', {
		style: 'unit',
		unit,
		unitDisplay: 'long',
	});

	return converter.format(value);
}
