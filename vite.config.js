import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

console.log('VITE_PORT:', process.env.VITE_PORT)

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  preview: {
    port: process.env.VITE_PORT || 4173,
    host: '0.0.0.0', // Todas as networks, para teste // REMOVER PARA RODAR APENAS NO DOCKER
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
