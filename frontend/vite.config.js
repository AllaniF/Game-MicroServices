import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite que el frontend sea accesible desde otros contenedores
    port: 5173,
    strictPort: true,
  },
});
