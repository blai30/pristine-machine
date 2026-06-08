import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// Library build -> ./dist (the publishable @pristine-machine/ui).
// Unlike the showcase build it does NOT run Tailwind or the React Compiler:
// the consumer's Tailwind compiles the classes, and shipping plain React keeps
// the source readable and dependency-free. Modules are preserved so each
// component keeps its literal class strings for Tailwind source-scanning.
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      entryRoot: 'src',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  publicDir: false,
  build: {
    outDir: 'dist',
    sourcemap: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@base-ui\/react($|\/)/,
        /^lucide-react($|\/)/,
        /^clsx($|\/)/,
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
})
