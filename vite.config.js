import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** 로컬 개발은 base `/` (HMR·정적 파일 404 방지), GitHub Pages 빌드만 서브경로 사용 */
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/web_condition_note/" : "/",
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
}));
