import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import { getTimezoneFormatted, getTimezones } from '../store/timezone';
import { formatTZValue } from '../utils';

export function useTimezones() {
	const timezones = useSelector(getTimezones);
	const selected = useSelector(getTimezoneFormatted('selectedTimezone'));
	const alternate = useSelector(getTimezoneFormatted('alternateTimezone'));

	const timezonesFormatted = timezones.map(formatTZValue);
	const currentTimezone = timezonesFormatted.find((tz: any) => tz.value === moment.tz.guess());

	return {
		timezones,
		timezonesFormatted,
		selected,
		alternate,
		currentTimezone,
	};
}
