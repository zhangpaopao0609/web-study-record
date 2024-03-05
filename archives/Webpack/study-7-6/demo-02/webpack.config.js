const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist/[fullhash]'),
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],

  target: 'node',

  mode: 'development',
};