
const FAQ = () => {
	return (
		<section id="faq" className="border-t border-slate-200 dark:border-slate-700">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
				<header className="mx-auto max-w-3xl text-center">
					<h2 className="section-title">FAQ</h2>
					<p className="section-subtitle">Answers to common questions</p>
				</header>

				<div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
					<div className="card">
						<h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Do you provide project code?</h3>
						<p className="mt-2 text-sm text-slate-700 dark:text-slate-300">No, we provide step-by-step project guides.</p>
					</div>
					<div className="card">
						<h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Can I use this for job prep?</h3>
						<p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Yes, it’s designed to strengthen portfolios.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQ; 