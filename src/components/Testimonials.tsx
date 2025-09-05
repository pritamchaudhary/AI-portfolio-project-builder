
const Testimonials = () => {
	return (
		<section id="testimonials" className="border-t border-slate-200">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
				<header className="mx-auto max-w-3xl text-center">
					<h2 className="section-title">Testimonials</h2>
					<p className="section-subtitle">What our users are saying</p>
				</header>

				<div className="mt-10">
					<figure className="card mx-auto max-w-3xl text-center">
						<blockquote className="text-base text-slate-700 sm:text-lg">
							“This helped me land my first job with a strong portfolio!”
						</blockquote>
						<figcaption className="mt-4 text-sm font-medium text-slate-900">– User B</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
};

export default Testimonials; 