const Header = () => {
	return (
		<header className="[grid-area:header] bg-gradient-to-r from-indigo-600/90 via-indigo-500/90 to-violet-600/90 backdrop-blur-sm border-b border-white/10">
			<div className="flex items-center justify-center gap-3 px-6 py-5">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
					<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" className="text-white/70" />
					<line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-indigo-200" />
					<line x1="12" y1="12" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-indigo-300" />
					<circle cx="12" cy="12" r="1" fill="currentColor" className="text-white/80" />
				</svg>
				<div>
					<h1 className="text-xl font-black tracking-tight sm:text-2xl">When and Where</h1>
					<p className="text-[11px] font-light tracking-wider text-white/60 uppercase">Timezone Converter</p>
				</div>
			</div>
		</header>
	);
};

export default Header;
