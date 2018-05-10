'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  modules: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
      },
      {
        test: /\.scss?$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};