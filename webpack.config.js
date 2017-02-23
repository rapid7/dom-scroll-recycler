/* eslint-disable */
'use strict';

var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

var DEV_MODE = process.env.NODE_ENV !== 'production';

if (!DEV_MODE) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: { 
        presets: [['es2015', { modules: false }], 'react', 'stage-0'],
        plugins: ['transform-runtime']
      }
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
