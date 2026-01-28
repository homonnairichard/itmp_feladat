import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": {
        target: "https://itmp.sulla.hu",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
