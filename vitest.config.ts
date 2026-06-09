import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Test build. Deliberately separate from vite.config.ts so the suite does NOT
// pull in Tailwind or the React Compiler: jsdom never renders CSS, and the
// component tests assert on literal class strings + data-* state, not styles.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // The library (components + lib) plus the showcase's logic-bearing helpers.
      // The rest of the showcase is presentational composition, verified visually
      // (Playwright, light + dark) rather than by unit coverage.
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/lib/**/*.{ts,tsx}',
        'src/showcase/nav.ts',
        'src/showcase/useTheme.ts',
        'src/showcase/useScrollSpy.ts',
        'src/showcase/ui.tsx',
      ],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/index.ts', '**/*.d.ts'],
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 88,
        branches: 85,
      },
    },
  },
})
