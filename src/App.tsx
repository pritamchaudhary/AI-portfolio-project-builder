
import { FAQ, Features, FinalCTA, Footer, Header, Hero, HowItWorks } from "./components";
import Pricing from "./components/Pricing";
import Problem from "./components/Problem";
import ProjectSuggestions from "./components/ProjectSuggestions";
import Solution from "./components/Solution";
import Testimonials from "./components/Testimonials";


const App = () => {
	return (
		<div className="min-h-screen bg-white">
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
	);
};

export default App; 
