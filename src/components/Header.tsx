const Header = () => {
	return (
		<header className="[grid-area:header] bg-gradient-to-r from-indigo-600/90 via-indigo-500/90 to-violet-600/90 backdrop-blur-sm border-b border-white/10">
			<div className="flex items-center justify-center gap-3 px-6 py-5">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white/80" aria-hidden="true">
					<path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
				</svg>
				<div>
					<h1 className="text-xl font-black tracking-tight sm:text-2xl">When &amp; Where</h1>
					<p className="text-[11px] font-light tracking-wider text-white/60 uppercase">Timezone Converter</p>
				</div>
			</div>
		</header>
	);
};

export default Header;
