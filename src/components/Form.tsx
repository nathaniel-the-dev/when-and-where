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

	function selectMyTZ() {
		dispatch(setTimezone({ key: 'selectedTimezone', value: currentTimezone!.value, fromSelect: true }));
	}

	function handleInput(id: 'selectedTimezone' | 'alternateTimezone') {
		return (e: any) => {
			dispatch(setTimezone({ key: id, value: e.value, fromSelect: true }));
		};
	}

	function swap() {
		dispatch(setTimezone({ key: 'selectedTimezone', value: alternate?.value, fromSelect: true }));
		dispatch(setTimezone({ key: 'alternateTimezone', value: selected?.value, fromSelect: true }));
	}

	return (
		<div>
			<p className="mb-8 text-xl text-center">Pick a time zone to convert to!</p>

			<Map />

			<form className="max-w-3xl mx-auto mt-8">
				<div className="flex items-end gap-6">
					<div className="flex-1 mb-1">
						<label htmlFor="timezone">Country or timezone</label>
						<Select
							id="timezone"
							placeholder="Search by country or timezone"
							options={timezones}
							onChange={handleInput('selectedTimezone')}
							value={selected}
							required
						/>
					</div>

					<button
						type="button"
						title="Swap"
						onClick={swap}
						className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
							/>
						</svg>
					</button>

					<div className="flex-1 mb-1">
						<label htmlFor="alternateTimezone">Other country or timezone</label>
						<Select
							id="alternateTimezone"
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
