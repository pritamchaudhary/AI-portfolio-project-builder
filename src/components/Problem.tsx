
const Problem = () => {
  return (
    <section id="problem" className="border-t border-slate-200 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl mx-auto text-center">
          <h2 className="section-title text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            The Problem
          </h2>
          <p className="section-subtitle mt-4 text-lg text-slate-600 dark:text-slate-400">
            Students and professionals often struggle to find the right projects that effectively showcase their skills and experience.  
            This leads to missed opportunities and difficulty standing out to employers.
          </p>
          <div className="mt-6">
            <svg
              className="mx-auto h-12 w-12 text-brand-start"
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

export default Problem;
 