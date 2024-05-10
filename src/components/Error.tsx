import { memo } from 'react';

export const Error = memo(() => {
	function goBack() {
		window.history.back();
	}

	function tryAgain() {
		window.location.reload();
	}

	return (
		<div className="h-screen grid place-items-center bg-gray-300 px-4">
			<div className="text-center bg-white p-10 rounded-lg w-full max-w-lg">
				<h1 className="font-bold text-3xl mb-6">Something went wrong</h1>
				<p>Looks like something went wrong accessing this page. Don't worry, this is most likely an issue on our side. We're working on it.</p>

				<div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
					<button onClick={goBack} className="btn">
						Okay
					</button>
					<button onClick={tryAgain} className="btn">
						Try Again
					</button>
				</div>
			</div>
		</div>
	);
});
