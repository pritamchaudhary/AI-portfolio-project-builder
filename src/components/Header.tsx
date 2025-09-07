import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
	{ href: "#hero", label: "Home" },
	{ href: "#features", label: "Features" },
	{ href: "#how", label: "How It Works" },
	{href: "#suggestions", label: "Project Suggestions" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#faq", label: "FAQ" },
];

const Header= () => {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur transition-colors duration-200">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
				<a href="#hero" className="flex items-center gap-2" aria-label="AI Portfolio Project Builder - Home">
					{/* <img src="/logo.svg" alt="AI Portfolio Project Builder logo" className="h-8 w-8" /> */}
					<span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-base">AI Portfolio Project Builder</span>
				</a>

				<nav className="hidden items-center gap-6 md:flex" aria-label="Primary Navigation">
					{navItems.map((item) => (
						<a key={item.href} href={item.href} className="text-sm text-slate-600 dark:text-slate-400 transition-colors hover:text-slate-900" role="link">
							{item.label}
						</a>
					))}
					<ThemeToggle />
					<a href="#suggestions" className="btn-gradient text-sm">Build My Projects</a>
				</nav>
				
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<button
						className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 dark:text-slate-400  hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
						aria-label="Toggle menu"
						aria-expanded={open}
						onClick={() => setOpen((v) => !v)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
							{open ? (
								<path fillRule="evenodd" d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" clipRule="evenodd" />
							) : (
								<path fillRule="evenodd" d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm.75 5.25a.75.75 0 000 1.5h15a.75.75 0 000-1.5h-15z" clipRule="evenodd" />
							)}
						</svg>
					</button>
				</div>
			</div>

			{open && (
				<div className="border-t border-slate-200 dark:border-slate-700 md:hidden">
					<nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile Navigation">
						{navItems.map((item) => (
							<a key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200" onClick={() => setOpen(false)}>
								{item.label}
							</a>
						))}
						<a href="#suggestions" className="btn-gradient mt-2 text-sm" onClick={() => setOpen(false)}>Build My Projects</a>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header; 