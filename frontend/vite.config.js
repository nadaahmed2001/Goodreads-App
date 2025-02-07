import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Change to your desired port
  },
});

//to kill any process in this port 5173
// write in cmd :
// 1- netstat -ano | findstr :5173
// 2- taskkill /PID الرقم اللي هيظهر م الخطوة اللي قبلها /F
