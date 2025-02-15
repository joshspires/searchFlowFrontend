import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';

export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://searchflow-ed703fb051f2.herokuapp.com", // Your backend server URL
  //       // target: "http://localhost:3003", // Your backend server URL
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
