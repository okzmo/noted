import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss()],
  server: {
    proxy: {
      "/notedtool-api": {
        target: "https://api.notion.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/notedtool-api/, ""),
      },
    },
  },
  build: {
    sourcemap: true,
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      name: "noted-react",
      entry: resolve(__dirname, "lib/main.ts"),
      fileName: (format) => `noted-react.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
