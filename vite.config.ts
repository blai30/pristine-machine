import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Single source of truth for the showcase's displayed version: package.json.
const { version } = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf-8')
)

// https://vite.dev/config/
export default defineConfig({
  // Root by default (Cloudflare Pages, local dev); GitHub Pages sets this to
  // its project subpath via the deploy workflow.
  base: process.env.PAGES_BASE_PATH ?? '/',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [tailwindcss(), react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist-site',
  },
})
