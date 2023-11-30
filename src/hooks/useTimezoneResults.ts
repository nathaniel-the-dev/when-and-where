import moment from 'moment';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export function useTimezoneResults() {
	const currentTimezone = useSelector((state: AppState) => state.timezone.selectedTimezone);
	const alternateTimezone = useSelector((state: AppState) => state.timezone.alternateTimezone);

	const [formattedTime, setFormattedTime] = useState('');
	const [formattedTime2, setFormattedTime2] = useState('');
	const [hoursAhead, setHoursAhead] = useState(0);

	useEffect(() => {
		if (!currentTimezone || !alternateTimezone) return;

		// Setup timer
		const interval = setInterval(() => {
			// Get current time (formatted)
			setFormattedTime(() => moment.tz(Date.now(), currentTimezone.name).format('hh:mm A'));
			setFormattedTime2(() => moment.tz(Date.now(), alternateTimezone.name).format('hh:mm A'));
		}, 1000);

		// Get hours ahead
		const currentTime = new Date().toLocaleString('en-US', { timeZone: currentTimezone.name });
		const alternateTime = new Date().toLocaleString('en-US', { timeZone: alternateTimezone.name });
		const hoursBetween = Math.round(new Date(alternateTime).getTime() - new Date(currentTime).getTime()) / 36e5;
		setHoursAhead(hoursBetween);

		return () => {
			clearInterval(interval);
		};
	}, [currentTimezone, alternateTimezone]);

	return {
		currentTimezone,
		alternateTimezone,
		formattedTime,
		formattedTime2,
		hoursAhead,
	};
}
