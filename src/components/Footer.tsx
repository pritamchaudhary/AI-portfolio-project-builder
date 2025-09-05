
const Footer = () => {
	return (
		<footer className="border-t border-slate-200">
			<div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-slate-600 sm:px-6">
				<p>
					© {new Date().getFullYear()} AI Portfolio Project Builder. All rights reserved.
				</p>
				<p className="mt-2">
					Built with <span className="text-slate-900">React</span> + <span className="text-slate-900">TailwindCSS</span>.
				</p>
			</div>
		</footer>
	);
};

export default Footer; 