import React from 'react';

const Main = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="container py-8 [grid-area:main] main-section md:py-10">
			<p className="mb-6 text-base text-center text-slate-400 md:mb-8 md:text-lg">
				Select a timezone or click anywhere on the map
			</p>
			{children}
		</section>
	);
};

export default Main;
