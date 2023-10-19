import Select from 'react-select';
import moment from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { setTimezone } from '../store/timezone';
import { Map } from './Map';
import { AppState } from '../store';
import { formatTZValue } from '../hooks/utils';

export const Form = () => {
	const dispatch = useDispatch();

	const timezones = useSelector((state: AppState) => state.timezone.timezones).map(formatTZValue);
	const selected = useSelector(
		(state: AppState) => state.timezone.selectedTimezone && formatTZValue(state.timezone.selectedTimezone)
	);
	const alternate = useSelector(
		(state: AppState) => state.timezone.alternateTimezone && formatTZValue(state.timezone.alternateTimezone)
	);

	const currentTimezone = timezones.find((tz: any) => tz.value === moment.tz.guess());

	const selectMyTZ = () => {
		dispatch(setTimezone({ key: 'selectedTimezone', value: currentTimezone!.value, fromSelect: true }));
	};

	const handleInput = (id: 'selectedTimezone' | 'alternateTimezone') => (e: any) => {
		dispatch(setTimezone({ key: id, value: e.value, fromSelect: true }));
	};

	return (
		<div>
			<p className="mb-8 text-xl text-center">Pick a time zone to convert to!</p>

			<Map />

			<form className="max-w-3xl mx-auto mt-8">
				<div className="flex items-start gap-4">
					<div className="flex-1">
						<label htmlFor="timezone">Country or timezone</label>
						<Select
							id="timezone"
							placeholder={currentTimezone?.label}
							options={timezones}
							onChange={handleInput('selectedTimezone')}
							value={selected}
							required
						/>
						{currentTimezone && (
							<button type="button" className="mt-2 text-blue-600 hover:underline" onClick={selectMyTZ}>
								Use my location
							</button>
						)}
					</div>
					<div className="flex-1">
						<label htmlFor="alternateTimezone">Other country or timezone</label>
						<Select
							id="alternateTimezone"
							placeholder=""
							options={timezones.filter((tz: any) => tz.value !== selected?.label)}
							onChange={handleInput('alternateTimezone')}
							value={alternate}
							required
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
