
const features = [
	{ title: "AI-based portfolio analysis", icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-brand-start">
				<path d="M12 2a9.99 9.99 0 00-7.07 2.93A10 10 0 1012 2z" />
			</svg>
		) },
	{ title: "Personalized project suggestions", icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-brand-start">
				<path d="M12 3l7 6h-4v8H9V9H5l7-6z" />
			</svg>
		) },
	{ title: "Guided PDFs for each project", icon: (
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 text-brand-start">
				<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm6-9v5h5" />
			</svg>
		) },
	{ title: "Trending tech stack recommendations", icon: (
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 text-brand-start">
				<path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z" />
			</svg>
		) },
	{ title: "Portfolio enhancement tips", icon: (
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 text-brand-start">
				<path d="M11 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H2a1 1 0 110-2h8V3a1 1 0 011-1z" />
			</svg>
		) },
];

const Features = () => {
	return (
		<section id="features" className="border-t border-slate-200">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
				<header className="mx-auto max-w-3xl text-center">
					<h2 className="section-title">Key Features</h2>
					<p className="section-subtitle">Everything you need to build a standout portfolio.</p>
				</header>
				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((f) => (
						<div key={f.title} className="card">
							<div className="flex items-start gap-3">
								<div className="rounded-md bg-slate-50 p-2">{f.icon}</div>
								<h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features; 