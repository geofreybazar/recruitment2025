import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/",
  server: {
    proxy: {
      "/adminuser_api": "http://localhost:3006",
      "/recruit_api": "http://localhost:3006",
    },
  },
});
