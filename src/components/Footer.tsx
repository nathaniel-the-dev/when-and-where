const Footer = () => {
	return (
		<footer className="[grid-area:footer] border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
			<div className="flex items-center justify-center gap-1.5 px-6 py-3">
				<span className="text-xs text-slate-500">Made by</span>
				<a
					href="https://github.com/Nathan1434"
					target="_blank"
					className="text-xs font-medium text-slate-400 transition-all duration-200 ease-in-out hover:text-indigo-400 hover:underline"
				>
					Nathaniel Campbell
				</a>
			</div>
		</footer>
	);
};

export default Footer;
