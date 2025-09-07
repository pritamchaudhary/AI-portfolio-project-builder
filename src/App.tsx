
import { FAQ, Features, FinalCTA, Footer, Header, Hero, HowItWorks } from "./components";
import Pricing from "./components/Pricing";
import Problem from "./components/Problem";
import ProjectSuggestions from "./components/ProjectSuggestions";
import Solution from "./components/Solution";
import Testimonials from "./components/Testimonials";
import { ThemeProvider } from "./contexts/ThemeContext";



const App = () => {
	return (
		<ThemeProvider>
			<div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200">
				<Header />
				<main>
					<Hero />
					<Problem />
					<Solution />
					<Features />
					<HowItWorks />
					<Testimonials />
					<ProjectSuggestions />
					<Pricing />
					<FAQ />
					<FinalCTA />
				</main>
				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default App; 
