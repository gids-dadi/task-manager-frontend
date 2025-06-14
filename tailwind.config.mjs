/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBrand: "#248445",
        brandSuccess: "#05C597",
        brandSuccessLight: "#B1E33D",
        brandBlue: "#1B335E",
        brandBg: "#F1F8FE",
        brandGreen: "#50BFA5",
        primaryBrand: "#FC4100",
        brandBlack: "#0E0E2C",
        brandSuccess: "#05C597",
        brandBg: "#F5F2E9",
        brandBgLight: "#FAF8F1",
        cardHeaderBg: "#F9E7E0",
        brandYellow: "#F2C94C",
        brandYellowLight: "#FFF5D6",
        brandGreenLight: "#A7FFCD",
        brandGray: "#F2F1F1",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppinsBlack: ["var(--font-poppins-black)"],
        poppinsBold: ["var(--font-poppins-bold)"],
        poppinsLight: ["var(--font-poppins-light)"],
        poppinsMedium: ["var(--font-poppins-medium)"],
        poppinsRegular: ["var(--font-poppins-regular)"],
      },
    },
  },
  plugins: [],
};

export default config;
