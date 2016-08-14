'use strict';
const webpack = require('webpack');
const config = require('./config');
const defined = require('defined');
const qs = require('querystring');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestGeneratorPlugin = require('webpack-bbq-manifest-generator');

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

// 文件名需要有 .bundle
// 文件名在开发环境中没有 chunkhash, contenthash, hash
// devtool 也不一样
let filename;
let cssfilename;
let bundlename;
let devtool;

// 开发环境
const debug = process.env.NODE_ENV === 'development';
if (debug) {
  filename = '[name].bundle.js';
  cssfilename = '[name].bundle.css';
  bundlename = '[path][name].[ext]';
  devtool = 'inline-source-map';
} else {
  filename = '[name]-[chunkhash].bundle.js';
  cssfilename = '[name]-[contenthash].bundle.css';
  bundlename = '[path][name].[ext]';
  devtool = 'source-map';
}
// plugins
const plugins = [
  new ExtractTextPlugin(cssfilename),
  new webpack.optimize.CommonsChunkPlugin({
    filename,
    children: true,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new ManifestGeneratorPlugin(`${config.basedir}/app-revisions.json`),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));
}

let babelquery = {
  'presets[]': ['es2015'],
  'plugins[]': ['transform-object-rest-spread', 'add-module-exports'],
};
babelquery = qs.stringify(babelquery, null, null, {
  encodeURIComponent: (s) => (s),
});

const styleLoaderName = config.styleLoaderName || 'style-loader';
const cssLoaderName = 'css-loader-bbq';

const urlLoader = `url-loader?name=${bundlename}`;
module.exports = {
  entry: { earth: './src/client.js' },
  output: {
    filename,
    chunkFilename: filename,
    path: config.outputdir,
    publicPath: defined(config.publicPath, config.rootdir),
  },
  devtool,
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        loader: `babel?${babelquery}`,
      },
      {
        test: /\.css$/,
        include: /\/node_modules\//,
        loaders: ExtractTextPlugin.extract(styleLoaderName, cssLoaderName).split('!'),
      },
      {
        test: /\.css$/,
        exclude: /\/node_modules\//,
        loaders: ExtractTextPlugin.extract(styleLoaderName, cssLoaderName).split('!'),
      },
      {
        test: /\.(png|jpg|ico)$/,
        loader: `${urlLoader}&limit=25000`,
      },
      {
        test: /\.(svg)/,
        loader: `${urlLoader}&limit=10000&mimetype=image/svg_xml`,
      },
      {
        test: /\.(woff|ttf|woff2|eot)/,
        loader: `${urlLoader}&limit=20000`,
      },
    ],
  },
  plugins,
};
