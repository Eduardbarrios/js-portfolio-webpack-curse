const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtarctPlugin = require('mini-css-extract-plugin');
const dotEnv = require('dotenv-webpack')
const bundleAnalyzer = require('webpack-bundle-analyzer')

module.exports = {
 entry: './src/index.js',
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js',
 },
 mode: 'development',
 resolve:{
  extensions:['.js']
 },
 module:{
  rules:[
   {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
     loader: 'babel-loader'
    }
   },
   {
    test: /\.css$/i,
    use: [miniCssExtarctPlugin.loader, 'css-loader'],
   },
   {
    test: /\.png/,
    type: `asset/resource`,
    generator:{
     filename:"assets/images/[name][contenthash][ext]"
    },

   },
   {
    test:/\.(woff|woff2)$/,
    type: `asset/resource`,
    generator:{
     filename:"assets/fonts/[name][contenthash][ext]"
    },
   }
  ]
 },
 plugins:[
  new htmlWebpackPlugin({
   inject: true,
   template: './public/index.html',
   filename: './index.html'
  }),
  new miniCssExtarctPlugin({
   filename: 'assets/[name][contenthash].css'
  }), 
  new dotEnv(),
  new bundleAnalyzer(),
 ], 


}