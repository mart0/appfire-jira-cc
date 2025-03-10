const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// Load environment variables from .env file
dotenv.config();

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Bundle with webpack
console.log('Bundling with webpack...');
webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Webpack bundling failed:', err || stats.toString({
      chunks: false,
      colors: true
    }));
    process.exit(1);
  }
  
  console.log('Webpack bundling successful!');
  
  // Copy non-TypeScript files to dist
  console.log('Copying manifest.yml...');
  fs.copyFileSync('manifest.yml', path.join('dist', 'manifest.yml'));
  
  console.log('Build completed successfully!');
}); 