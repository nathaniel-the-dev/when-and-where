import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { getTimezoneString } from '../hooks/utils';

export const Results = () => {
	const currentTimezone = useSelector((state: AppState) => state.timezone.selectedTimezone);
	const alternateTimezone = useSelector((state: AppState) => state.timezone.alternateTimezone);

	const [formattedTime, setFormattedTime] = useState('');
	const [formattedTime2, setFormattedTime2] = useState('');
	const [hoursAhead, setHoursAhead] = useState(0);

	const converter = new Intl.NumberFormat('en-US', {
		style: 'unit',
		unit: 'hour',
		unitDisplay: 'long',
	});

	useEffect(() => {
		if (!currentTimezone || !alternateTimezone) return;

		// Setup timer
		// CHECKME: Check for recurrence
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

	return (
		<>
			{currentTimezone && alternateTimezone && (
				<div className="mt-8 text-center">
					<div className="flex justify-center gap-8">
						{/* Current Time */}
						<div>
							<h2>Time in {getTimezoneString(currentTimezone)}</h2>
							<p className="text-3xl font-semibold">{formattedTime}</p>
						</div>

						{/* Converted Time */}
						<div>
							<h2>Time In {getTimezoneString(alternateTimezone)}</h2>
							<p className="text-3xl font-semibold">{formattedTime2}</p>
						</div>
					</div>

					{/* Hours Ahead */}
					{hoursAhead !== 0 && (
						<div className="mt-6">
							<p className="italic">
								{`${currentTimezone.alternativeName} (${currentTimezone.countryName})`} is{' '}
								<b>{converter.format(Math.abs(hoursAhead))} </b>{' '}
								{hoursAhead <= 0 ? 'ahead of' : 'behind'}{' '}
								{`${alternateTimezone.alternativeName} (${alternateTimezone.countryName})`}.
							</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};
