import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				// daisy ui colors
				primary: "#05f140ff",
				"primary-content": "#001401",
				secondary: "#2cda9dff",
				"secondary-content": "#011109",
				accent: "#a5b4fc",
				"accent-content": "#0a0c16",
				neutral: "#d1d5db",
				"neutral-content": "#101011",
				"base-100": "#fff7f6",
				"base-200": "#ded7d6",
				"base-300": "#beb7b7",
				"base-content": "#161515",
				info: "#a8a29e",
				"info-content": "#0a0a09",
				success: "#bef264",
				"success-content": "#0d1403",
				warning: "#fbbf24",
				"warning-content": "#150d00",
				error: "#e11d48",
				"error-content": "#ffd8d9",

				// shadcn colours
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "#39393aff",
				foreground: "#EEFCF7",

				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},

				popover: {
					DEFAULT: "#f96900ff",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#05f140ff",
					"primary-content": "#001401",
					secondary: "#2cda9dff",
					"secondary-content": "#011109",
					accent: "#a5b4fc",
					"accent-content": "#0a0c16",
					neutral: "#d1d5db",
					"neutral-content": "#101011",
					"base-100": "#fff7f6",
					"base-200": "#ded7d6",
					"base-300": "#beb7b7",
					"base-content": "#161515",
					info: "#a8a29e",
					"info-content": "#0a0a09",
					success: "#bef264",
					"success-content": "#0d1403",
					warning: "#fbbf24",
					"warning-content": "#150d00",
					error: "#e11d48",
					"error-content": "#ffd8d9",
				},
			},
		],
	},
} satisfies Config;

export default config;
