const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'pwa',
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何旧的 ServeiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],

  mode: 'development',
};