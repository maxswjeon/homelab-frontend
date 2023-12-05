import { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        'd2coding': "D2Coding, 'D2 coding', monospace",
      },
      colors: {
        code: "#f1f1ef",
      }
    },
  },
  plugins: [],
} satisfies Config;

