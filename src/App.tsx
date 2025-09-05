
import { FAQ, Features, FinalCTA, Footer, Header, Hero, HowItWorks } from "./components";
import Pricing from "./components/Pricing";
import ProjectSuggestions from "./components/ProjectSuggestions";
import Testimonials from "./components/Testimonials";


const App = () => {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<main>
				<Hero />
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
