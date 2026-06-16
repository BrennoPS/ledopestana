import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Caminho base no GitHub Pages. Ajuste para o nome do repositório, ex.: '/ledopestana/'.
// Para domínio próprio ou raiz, use '/'.
const BASE = '/ledopestana/'

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
})
