import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Coffee-website.github.io/",
  plugins: [react()],
  build: { outDir: "dist", assetsInlineLimit: 0 },
});
