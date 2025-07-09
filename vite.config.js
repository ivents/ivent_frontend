import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.API_BASE_URL": JSON.stringify(env.API_BASE_URL),
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://development-api.iventverse.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/events': {
          target: 'https://development-api.iventverse.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path
        },
        '/auth': {
          target: 'https://development-api.iventverse.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path
        }
      }
    }
  };
});
