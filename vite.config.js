import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/web_condition_note/",
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
});
