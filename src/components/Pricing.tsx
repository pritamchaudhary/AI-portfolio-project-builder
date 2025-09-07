import { useState } from "react";

type Plan = {
	title: string;
	price: string;
	desc: string;
	features: string[];
	cta: string;
	popular?: boolean;
};

const plans: Plan[] = [
	{ title: "Free", price: "$0", desc: "1 project suggestion", features: ["1 project idea", "Basic guidance"], cta: "Get Started" },
	{ title: "Pro", price: "$19/month", desc: "5 projects", features: ["5 project ideas", "Step-by-step guides", "Best stack picks"], cta: "Choose Pro", popular: true },
	{ title: "Premium", price: "$49/month", desc: "unlimited", features: ["Unlimited ideas", "All guides", "Portfolio tips"], cta: "Go Premium" },
];

const Pricing = () => {

	const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

	return (
		<section id="pricing" className="border-t border-slate-200 dark:border-slate-700">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
				<header className="mx-auto max-w-3xl text-center">
					<h2 className="section-title">Pricing</h2>
					<p className="section-subtitle">Simple plans to start building projects today.</p>
				</header>
				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{plans.map((p) => (
						<div
							key={p.title}
							onClick={() => setSelectedPlan(p.title)}
							className={`card relative cursor-pointer transition-shadow duration-300 ${
							selectedPlan === p.title ? "border-2 border-brand-start shadow-lg" : "border border-slate-200 dark:border-slate-700"
							}`}
						>
							{p.popular && (
							<span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-brand-start to-brand-end px-3 py-1 text-xs font-semibold text-white">
								Popular
							</span>
							)}
									<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{p.title}</h3>
									<p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{p.price}</p>
									<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.desc}</p>
									<ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
							{p.features.map((f) => (
								<li key={f} className="flex items-center gap-2">
								<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-brand-start to-brand-end text-[10px] text-white">✓</span>
								<span>{f}</span>
								</li>
							))}
							</ul>
							<div className="mt-6">
								<a href="#faq" className="btn-gradient w-full">{p.cta}</a>
							</div>
						</div>
					))}

				</div>
			</div>
		</section>
	);
};

export default Pricing; 