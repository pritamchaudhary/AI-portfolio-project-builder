
const Solution = () => {
  return (
    <section id="solution" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl mx-auto text-center">
          <h2 className="section-title text-3xl font-extrabold text-gray-900">
            The Solution
          </h2>
          <p className="section-subtitle mt-4 text-lg text-gray-700">
            Upload your resume or portfolio, and our AI-powered platform analyzes your skills to suggest the top 5 trending, guided projects specifically tailored for you.  
            Take advantage of personalized guidance to build an impressive portfolio that stands out.
          </p>
          <div className="mt-6">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2a4 4 0 018 0v2m-4-4v.01M6 18v-2a4 4 0 018 0v2m-4-4v.01M12 20v-2"
              />
            </svg>
          </div>
        </header>
      </div>
    </section>
  );
};

export default Solution;
