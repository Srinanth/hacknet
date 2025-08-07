/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js app directory
    "./src/**/*.{js,ts,jsx,tsx}", // your src folder
    "./components/**/*.{js,ts,jsx,tsx}", // reusable components
    "./pages/**/*.{js,ts,jsx,tsx}", // pages folder if used
    "*.{js,ts,jsx,tsx,mdx}", // root-level files
  ],
  theme: {
    extend: {
      colors: {
        // Custom semantic tokens (required for border-border, bg-muted, etc.)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        accentForeground: "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        destructiveForeground: "hsl(var(--destructive-foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
};
