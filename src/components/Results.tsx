import { getTimeUnits, getTimezoneString } from '../utils';
import { useTimezoneResults } from '../hooks/useTimezoneResults';

export const Results = () => {
	const { currentTimezone, alternateTimezone, formattedTime, formattedTime2, hoursAhead } = useTimezoneResults();

	return (
		<>
			{formattedTime && formattedTime2 && (
				<div className="mt-8 overflow-hidden text-center bg-gray-800 rounded-lg">
					<div className="grid gap-8 px-4 py-4">
						{/* Current Time */}
						<div className="space-y-2">
							<h2 className="text-gray-300">{getTimezoneString(currentTimezone)}</h2>
							<p className="text-3xl font-semibold">{formattedTime}</p>
						</div>

						{/* Converted Time */}
						<div className="space-y-2">
							<h2 className="text-gray-300">{getTimezoneString(alternateTimezone)}</h2>
							<p className="text-3xl font-semibold">{formattedTime2}</p>
						</div>
					</div>

					{/* Hours Ahead */}
					{hoursAhead !== 0 && (
						<div className="max-w-prose p-4 mx-auto mt-2 bg-gray-900">
							<p className="italic">
								{`${currentTimezone!.alternativeName} (${currentTimezone!.countryName})`} {'is '}
								<b>{getTimeUnits(Math.abs(hoursAhead))} </b> {hoursAhead <= 0 ? 'ahead of' : 'behind'}{' '}
								{`${alternateTimezone!.alternativeName} (${alternateTimezone!.countryName})`}.
							</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};
