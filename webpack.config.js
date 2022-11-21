const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtarctPlugin = require('mini-css-extract-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const dotEnv = require('dotenv-webpack');

module.exports = {
 entry: './src/index.js',
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js',
  clean: true, 
 },
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
 ],
 optimization: {
  minimize: true,
  minimizer:[
   new cssMinimizerPlugin(),
   new terserPlugin(),
  ]
 }, 


}