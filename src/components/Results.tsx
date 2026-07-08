import { getTimeUnits, getTimezoneString } from '../utils';
import { useTimezoneResults } from '../hooks/useTimezoneResults';

export const Results = () => {
	const { currentTimezone, alternateTimezone, formattedTime, formattedTime2, hoursAhead } = useTimezoneResults();

	return (
		<>
			{formattedTime && formattedTime2 && (
				<div className="mt-4 overflow-hidden text-center transition-all duration-500 animate-slide-up bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/5 sm:mt-6" aria-live="polite" aria-atomic="true">
					<div className="grid gap-6 px-5 py-6 sm:px-6">
						<div className="space-y-1.5">
							<h2 className="text-xs font-medium tracking-wide text-slate-400 uppercase truncate">{currentTimezone && getTimezoneString(currentTimezone)}</h2>
							<p className="text-4xl font-black tracking-tight text-white" aria-label={`Current time: ${formattedTime}`}>
								{formattedTime}
							</p>
							<p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Your time</p>
						</div>

						<div className="w-12 h-px mx-auto bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" aria-hidden="true" />

						<div className="space-y-1.5">
							<h2 className="text-xs font-medium tracking-wide text-slate-400 uppercase truncate">{alternateTimezone && getTimezoneString(alternateTimezone)}</h2>
							<p className="text-4xl font-black tracking-tight text-white" aria-label={`Converted time: ${formattedTime2}`}>
								{formattedTime2}
							</p>
							<p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Converted time</p>
						</div>
					</div>

					{hoursAhead !== 0 && currentTimezone && alternateTimezone && (
						<div className="px-5 py-3.5 border-t border-white/5 bg-white/[0.02]">
							<p className="text-sm text-slate-400" aria-label={`${currentTimezone.alternativeName} is ${getTimeUnits(Math.abs(hoursAhead))} ${hoursAhead >= 0 ? 'ahead of' : 'behind'} ${alternateTimezone.alternativeName}`}>
								<span className="font-medium text-slate-200">{currentTimezone.alternativeName}</span>
								{' '}is{' '}
								<span className="font-bold text-indigo-400">{getTimeUnits(Math.abs(hoursAhead))}</span>{' '}
								{hoursAhead >= 0 ? 'ahead of' : 'behind'}{' '}
								<span className="font-medium text-slate-200">{alternateTimezone.alternativeName}</span>.
							</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};
