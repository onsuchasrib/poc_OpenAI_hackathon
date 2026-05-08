import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/poc_OpenAI_hackathon/',
  build: {
    target: 'es2022'
  },
  test: {
    exclude: ['node_modules/**', 'dist/**', '.omx/**']
  }
});
