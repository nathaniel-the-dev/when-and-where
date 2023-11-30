import { useDispatch, useSelector } from 'react-redux';
import { setTimezone } from '../../store/timezone';
import { AppState } from '../../store';
import { formatTZValue } from '../../utils';

export function SwapButton({ children }: { children?: React.ReactNode }) {
	const dispatch = useDispatch();

	const selected = useSelector(
		(state: AppState) => state.timezone.selectedTimezone && formatTZValue(state.timezone.selectedTimezone)
	);
	const alternate = useSelector(
		(state: AppState) => state.timezone.alternateTimezone && formatTZValue(state.timezone.alternateTimezone)
	);

	function swap() {
		dispatch(setTimezone({ key: 'selectedTimezone', value: alternate?.value, fromSelect: true }));
		dispatch(setTimezone({ key: 'alternateTimezone', value: selected?.value, fromSelect: true }));
	}

	return (
		<button type="button" title="Swap" onClick={swap} className="btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
				/>
			</svg>

			{children}
		</button>
	);
}
