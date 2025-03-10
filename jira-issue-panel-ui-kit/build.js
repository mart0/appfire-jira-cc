const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Compile TypeScript
console.log('Compiling TypeScript...');
try {
  // Set environment variables for the build process
  const env = {
    ...process.env,
    EMAIL: process.env.EMAIL || '',
    API_TOKEN: process.env.API_TOKEN || '',
    BASE_URL: process.env.BASE_URL || ''
  };
  
  execSync('npx tsc', { stdio: 'inherit', env });
  console.log('TypeScript compilation successful!');
} catch (error) {
  console.error('TypeScript compilation failed:', error);
  process.exit(1);
}

// Copy non-TypeScript files to dist
console.log('Copying manifest.yml...');
fs.copyFileSync('manifest.yml', path.join('dist', 'manifest.yml'));

console.log('Build completed successfully!'); 