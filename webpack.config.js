const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'zr.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'soure-map',
  resolve: {
    modules: [path.resolve(__dirname, 'source'), 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
}