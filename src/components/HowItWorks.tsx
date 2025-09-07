
const steps = [
	{ step: 1, text: "Upload resume/portfolio." },
	{ step: 2, text: "AI analyzes skills and experience." },
	{ step: 3, text: "Get top 5 trending project ideas with guides." },
	{ step: 4, text: "Download detailed PDFs to execute projects." },
];

const HowItWorks = () => {
	return (
		<section id="how" className="border-t border-slate-200 dark:border-slate-700">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
				<header className="mx-auto max-w-3xl text-center">
					<h2 className="section-title">How It Works</h2>
					<p className="section-subtitle">Four simple steps to get AI-guided projects.</p>
				</header>
				<ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((s) => (
						<li key={s.step} className="card">
							<div className="flex items-start gap-3">
								<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-brand-start to-brand-end text-sm font-semibold text-white">{s.step}</span>
								<p className="text-sm text-slate-700 dark:text-slate-300">{s.text}</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
};

export default HowItWorks; 