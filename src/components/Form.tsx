import Select from 'react-select';
import type { StylesConfig } from 'react-select';
import { useDispatch } from 'react-redux';
import { setTimezone } from '../store/timezone';
import { useTimezones } from '../hooks/useTimezones';
import { SwapButton } from './buttons/SwapButton';
import type { SelectOption } from '../utils';

const selectTheme = (theme: import('react-select').Theme) => ({
	...theme,
	colors: {
		...theme.colors,
		primary: '#6366f1',
		primary75: '#818cf8',
		primary50: '#4f46e5',
		primary25: '#3730a3',
		neutral0: '#1e293b',
		neutral5: '#334155',
		neutral10: '#475569',
		neutral20: '#64748b',
		neutral30: '#94a3b8',
		neutral40: '#94a3b8',
		neutral50: '#94a3b8',
		neutral60: '#cbd5e1',
		neutral70: '#e2e8f0',
		neutral80: '#f1f5f9',
		neutral90: '#f8fafc',
		danger: '#ef4444',
		dangerLight: 'rgba(239, 68, 68, 0.15)',
	},
});

const selectStyles: StylesConfig<SelectOption, false> = {
	control: (base) => ({
		...base,
		background: 'rgba(30, 41, 59, 0.8)',
		border: '1px solid rgba(100, 116, 139, 0.3)',
		borderRadius: '0.75rem',
		padding: '2px',
		boxShadow: 'none',
		backdropFilter: 'blur(8px)',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			border: '1px solid rgba(99, 102, 241, 0.5)',
		},
	}),
	menu: (base) => ({
		...base,
		background: '#1e293b',
		border: '1px solid rgba(100, 116, 139, 0.2)',
		borderRadius: '0.75rem',
		overflow: 'hidden',
		zIndex: 50,
	}),
	option: (base, state) => ({
		...base,
		background: state.isFocused ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
		color: '#e2e8f0',
		fontSize: '0.875rem',
		padding: '0.625rem 0.75rem',
		cursor: 'pointer',
		transition: 'background 0.15s ease',
		'&:hover': {
			background: 'rgba(99, 102, 241, 0.15)',
		},
	}),
	singleValue: (base) => ({
		...base,
		color: '#f1f5f9',
		fontSize: '0.875rem',
	}),
	placeholder: (base) => ({
		...base,
		color: '#64748b',
		fontSize: '0.875rem',
	}),
	input: (base) => ({
		...base,
		color: '#f1f5f9',
	}),
	dropdownIndicator: (base) => ({
		...base,
		color: '#64748b',
		transition: 'color 0.2s ease',
		'&:hover': {
			color: '#94a3b8',
		},
	}),
	clearIndicator: (base) => ({
		...base,
		color: '#64748b',
		transition: 'color 0.2s ease',
		'&:hover': {
			color: '#ef4444',
		},
	}),
	menuList: (base) => ({
		...base,
		padding: '4px',
	}),
	noOptionsMessage: (base) => ({
		...base,
		color: '#64748b',
		fontSize: '0.875rem',
	}),
};

export const Form = () => {
	const { timezonesFormatted, currentTimezone, selected, alternate } = useTimezones();
	const dispatch = useDispatch();

	function selectMyTZ() {
		if (currentTimezone) {
			dispatch(setTimezone({ key: 'selectedTimezone', value: currentTimezone.value, fromSelect: true }));
		}
	}

	function handleInput(id: 'selectedTimezone' | 'alternateTimezone') {
		return (option: SelectOption | null) => {
			if (option) dispatch(setTimezone({ key: id, value: option.value, fromSelect: true }));
		};
	}

	return (
		<form className="max-w-3xl mx-auto my-4 mb-8 animate-fade-in sm:my-6 sm:mb-10" aria-label="Timezone selection">
			<div className="flex flex-col items-center gap-3">
				<div className="relative flex-1 w-full max-w-md">
					<label className="inline-block mb-1.5 text-xs font-medium tracking-wide text-slate-400 uppercase" htmlFor="selectedTimezone">
						Your timezone
					</label>
					<div className="flex items-center gap-2">
						<Select
							id="selectedTimezone"
							className="flex-1"
							placeholder="Search by country or timezone..."
							options={timezonesFormatted}
							onChange={handleInput('selectedTimezone')}
							value={selected}
							styles={selectStyles}
							theme={selectTheme}
							isClearable
							required
						/>
						<button
							className="inline-flex items-center justify-center w-10 h-10 transition-all duration-200 ease-in-out bg-slate-800/80 rounded-xl border border-slate-600/30 hover:bg-indigo-600/30 hover:border-indigo-500/50 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-400"
							onClick={selectMyTZ}
							type="button"
							title="Use my location"
							aria-label="Use my current location"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 text-slate-300"
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

				<SwapButton />

				<div className="flex-1 w-full max-w-md">
					<label className="inline-block mb-1.5 text-xs font-medium tracking-wide text-slate-400 uppercase" htmlFor="alternateTimezone">
						Compare with
					</label>
					<Select
						id="alternateTimezone"
						className="flex-1"
						placeholder="Choose another timezone..."
						options={timezonesFormatted.filter((tz) => tz.value !== selected?.value)}
						onChange={handleInput('alternateTimezone')}
						value={alternate}
						styles={selectStyles}
						theme={selectTheme}
						isClearable
						required
					/>
				</div>
			</div>
		</form>
	);
};
