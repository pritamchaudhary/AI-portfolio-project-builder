
const Hero= () => {
	return (
		<section id="hero" className="relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
				<div className="mx-auto max-w-3xl text-center">
					<h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
						From Portfolio to Projects in One Click
					</h1>
					<p className="mt-4 text-base text-slate-600 sm:text-lg">
						Let AI turn your profile into real-world projects.
					</p>
					<div className="mt-8 flex items-center justify-center gap-3">
						<a href="#suggestions" className="btn-gradient" aria-label="Build My Projects CTA">
							Build My Projects
						</a>
					</div>
				</div>
			</div>
			<div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-r from-brand-start to-brand-end opacity-20 blur-3xl" />
			<div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-r from-brand-end to-brand-start opacity-20 blur-3xl" />
		</section>
	);
};

export default Hero; 