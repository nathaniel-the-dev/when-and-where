import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export const Results = () => {
	const currentTimezone = useSelector((state: AppState) => state.timezone.selectedTimezone);
	const alternateTimezone = useSelector((state: AppState) => state.timezone.alternateTimezone);

	const [formattedTime, setFormattedTime] = useState('');
	const [formattedTime2, setFormattedTime2] = useState('');
	const [hoursAhead, setHoursAhead] = useState(0);

	function getTimezoneString(tz: any) {
		return `(${tz.abbreviation}) ${tz.alternativeName} - ${tz.countryName}`;
	}

	useEffect(() => {
		if (!currentTimezone || !alternateTimezone) return;

		// Setup timer
		// CHECKME: Check for recurrence
		const interval = setInterval(() => {
			// Get current time (formatted)
			setFormattedTime(() => moment.tz(Date.now(), currentTimezone.name).format('hh:mm:ss A'));
			setFormattedTime2(() => moment.tz(Date.now(), alternateTimezone.name).format('hh:mm:ss A'));
		}, 1000);

		// Get hours ahead
		const currentTime = new Date().toLocaleString('en-US', { timeZone: currentTimezone.name });
		const alternateTime = new Date().toLocaleString('en-US', { timeZone: alternateTimezone.name });
		const hoursBetween = Math.abs(new Date(alternateTime).getTime() - new Date(currentTime).getTime()) / 36e5;
		setHoursAhead(hoursBetween);

		return () => {
			clearInterval(interval);
		};
	}, [currentTimezone, alternateTimezone]);

	return (
		<>
			{currentTimezone && alternateTimezone ? (
				<div>
					<div>
						{/* Current Time */}
						<div>
							<h2>Time in {getTimezoneString(currentTimezone)}</h2>
							<p>{formattedTime}</p>
						</div>

						{/* Converted Time */}
						<div>
							<h2>Time In {getTimezoneString(alternateTimezone)}</h2>
							<p>{formattedTime2}</p>
						</div>
					</div>

					{/* Hours Ahead */}
					<div>
						<h2>Hours Ahead</h2>
						<p>{hoursAhead}</p>
					</div>
				</div>
			) : (
				<h1>Waiting for selection...</h1>
			)}
		</>
	);
};
