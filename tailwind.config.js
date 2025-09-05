/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
			},
			colors: {
				brand: {
					start: "#32a890", 
					end: "#3294a8", 
				},
			},
			boxShadow: {
				soft: "0 8px 24px rgba(2, 6, 23, 0.08)",
			},
    },
  },
  plugins: [],
}
