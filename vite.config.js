import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Frist-Portofolio/' // <-- TAMBAHIN BARIS INI (sesuaikan sama nama repo lu)
})