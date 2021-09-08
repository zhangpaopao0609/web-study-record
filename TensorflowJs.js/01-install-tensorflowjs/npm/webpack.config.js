const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'NPM Install Tensorflow.js',
    }),
  ],

  devServer: {
    port: '6090'
  },

  mode: 'development',
}