/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./setup.ts"],
  },
});
