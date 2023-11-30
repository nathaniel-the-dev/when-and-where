import React from 'react';

const Main = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="container py-12 [grid-area:main] main-section">
			<p className="mb-8 text-xl text-center">Select a timezone or choose a point on the map</p>
			{children}
		</section>
	);
};

export default Main;
