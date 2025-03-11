const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const esbuild = require('esbuild');

// Load environment variables from .env file
dotenv.config();

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Bundle with esbuild
console.log('Bundling with esbuild...');

// Build backend
esbuild.buildSync({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  target: 'node12',
  external: ['@forge/resolver', '@forge/bridge', '@forge/react', 'react', 'react-dom'],
  minify: true,
  sourcemap: true,
})

// Build frontend
esbuild.buildSync({
  entryPoints: ['./src/frontend/index.tsx'],
  bundle: true,
  outfile: 'dist/frontend/index.js',
  platform: 'browser',
  target: 'es2015',
  external: ['@forge/resolver', '@forge/bridge', '@forge/react', 'react', 'react-dom'],
  minify: true,
  sourcemap: true,
})

// Copy non-TypeScript files to dist
console.log('Copying manifest.yml...');
fs.copyFileSync('manifest.yml', path.join('dist', 'manifest.yml'));

console.log('Build completed successfully!'); 