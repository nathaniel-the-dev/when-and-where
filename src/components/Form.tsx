import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setTimezone } from '../store/timezone';
import { useTimezones } from '../hooks/useTimezones';

export const Form = () => {
	const { timezonesFormatted, currentTimezone, selected, alternate } = useTimezones();
	const dispatch = useDispatch();

	function selectMyTZ() {
		dispatch(setTimezone({ key: 'selectedTimezone', value: currentTimezone!.value, fromSelect: true }));
	}

	function handleInput(id: 'selectedTimezone' | 'alternateTimezone') {
		return (e: any) => {
			dispatch(setTimezone({ key: id, value: e.value, fromSelect: true }));
		};
	}

	return (
		<form className="max-w-3xl mx-auto my-8 mb-12">
			<div className="flex flex-col items-center gap-4">
				<div className="relative flex-1 w-full max-w-md mb-1">
					<label className="inline-block mb-1 text-gray-200" htmlFor="selectedTimezone">
						Country or timezone
					</label>
					<div className="flex items-center gap-2">
						<Select
							id="selectedTimezone"
							className="w-full text-black"
							placeholder="Search by country or timezone"
							options={timezonesFormatted}
							onChange={handleInput('selectedTimezone')}
							value={selected}
							required
						/>
						<button
							className="btn py-1.5 px-3 text-blue-500 bg-white rounded"
							onClick={selectMyTZ}
							type="button"
							title="Use my location"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div className="flex-1 w-full max-w-md mb-1">
					<label className="inline-block mb-1 text-gray-200" htmlFor="alternateTimezone">
						Other country or timezone
					</label>
					<Select
						id="alternateTimezone"
						className="w-full text-black"
						options={timezonesFormatted.filter((tz: any) => tz.value !== selected?.label)}
						onChange={handleInput('alternateTimezone')}
						value={alternate}
						required
					/>
				</div>
			</div>
		</form>
	);
};
