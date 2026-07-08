import { useDispatch, useSelector } from 'react-redux';
import { swapTimezones } from '../../store/timezone';
import { AppState } from '../../store';

export function SwapButton() {
	const dispatch = useDispatch();

	const canSwap = useSelector(
		(state: AppState) => state.timezone.selectedTimezone && state.timezone.alternateTimezone
	);

	return (
		<button
			type="button"
			title="Swap timezones"
			aria-label="Swap selected and alternate timezone"
			onClick={() => dispatch(swapTimezones())}
			disabled={!canSwap}
			className="inline-flex items-center justify-center w-10 h-10 transition-all duration-200 ease-in-out bg-indigo-600/80 rounded-xl hover:bg-indigo-500 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-indigo-600/80 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-5 h-5"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
				/>
			</svg>
		</button>
	);
}
