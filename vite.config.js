/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { alias } from "./alias.config.js";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  test: {
    // Your regular vitest settings (if any) can go here
  },
});
