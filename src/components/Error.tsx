import { memo } from 'react';

export const Error = memo(() => {
	function goBack() {
		window.history.back();
	}

	function tryAgain() {
		window.location.reload();
	}

	return (
		<div className="grid h-screen px-4 place-items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
			<div className="w-full max-w-lg p-10 text-center transition-all duration-500 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
				<div className="flex justify-center mb-6">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-400" aria-hidden="true">
							<path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
						</svg>
					</div>
				</div>
				<h1 className="mb-3 text-2xl font-black text-white">Something went wrong</h1>
				<p className="text-sm leading-relaxed text-slate-400">Looks like something went wrong accessing this page. Don&apos;t worry, this is most likely an issue on our side. We&apos;re working on it.</p>
				<div className="flex flex-wrap items-center justify-center gap-3 mt-8">
					<button onClick={goBack} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 ease-in-out bg-white/10 rounded-xl hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-indigo-400">
						Go Back
					</button>
					<button onClick={tryAgain} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 ease-in-out bg-indigo-600 rounded-xl hover:bg-indigo-500 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-indigo-400">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
							<path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
						</svg>
						Try Again
					</button>
				</div>
			</div>
		</div>
	);
});
