import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@noir-lang/noir_js', '@aztec/bb.js'],
  }
});

