// @ts-check
import { env } from 'node:process';
import { resolve, extname, join } from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getInputHtmlFiles() {
  const srcDir = resolve(__dirname, 'src');
  return readdirSync(srcDir)
    .filter((file) => extname(file) === '.html')
    .map((file) => join(srcDir, file));
}

export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: resolve(__dirname, 'static'),
    rollupOptions: {
      input: getInputHtmlFiles(),
    },
  },
  define: {
    BUILD_COMMIT_HASH: JSON.stringify(env.BUILD_COMMIT_HASH),
  },
});
