
import path, { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { config } from 'dotenv'
import { defineConfig } from "vite";

config({ path: resolve(__dirname, '../.env') });

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  server: {
    open: true,
    port: 80
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src", "components")
    }
  }
});
