tailwind.config = {
	darkMode: "class",
	theme: {
	    extend: {
	        colors: {
	            primary: "#3b82f6", // A shade of blue similar to the logo
	            "background-light": "#f3f4f6",
	            "background-dark": "#111827",
	            "card-light": "#ffffff",
	            "card-dark": "#1f2937",
	            "text-light": "#1f2937",
	            "text-dark": "#f9fafb",
	            "subtext-light": "#6b7280",
	            "subtext-dark": "#9ca3af",
	        },
	        fontFamily: {
	            display: ["Poppins", "sans-serif"],
	        },
	        borderRadius: {
	            DEFAULT: "0.5rem",
	            'xl': '1rem', // Added for larger rounding
	        },
	        boxShadow: {
	            'subtle': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
	            'subtle-dark': '0 4px 6px -1px rgb(255 255 255 / 0.05), 0 2px 4px -2px rgb(255 255 255 / 0.05)',
	        }
	    },
	},
};
