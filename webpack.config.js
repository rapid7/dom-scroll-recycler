/* eslint-disable */
'use strict';

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

const DEV_MODE = process.env.NODE_ENV !== 'production';

if (!DEV_MODE) {
  plugins.push(
    new TerserPlugin({
      cache: false,
      parallel: true,
      sourceMap: false,
      terserOptions: {
        output: {
          comments: false
        }
      }
    })
  );
}

module.exports = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/,
    }]
  },

  entry: {
    app: './src/index.js',
  },

  watch: DEV_MODE,

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'index.js',
    publicPath: '/js/',
    library: 'domScrollRecycler',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js'],
    modules: [__dirname, path.resolve('src'), 'node_modules']
  }
};
