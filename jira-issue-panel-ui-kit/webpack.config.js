const path = require('path');

module.exports = {
  entry: {
    'index': './src/index.ts',
    'frontend/index': './src/frontend/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  externals: {
    '@forge/resolver': 'commonjs @forge/resolver',
    '@forge/bridge': 'commonjs @forge/bridge',
    '@forge/react': 'commonjs @forge/react',
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom'
  },
  target: 'node'
}; 