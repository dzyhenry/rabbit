/* eslint global-require:0, prefer-arrow-callback:0 no-console: 0 */
'use strict';
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}
const port = require('./port');

if (process.env.NODE_ENV === 'development') {
  const WebpackDevServer = require('webpack-dev-server');
  const webpack = require('webpack');

  const config = require('../config');
  const webpackConfig = require('../webpack.config');

  const statsOptions = {
    colors: { level: 1, hasBasic: true, has256: false, has16m: false },
    cached: false, cachedAssets: false, assets: true, modules: false, chunks: false,
    reasons: false, errorDetails: true, chunkOrigins: false, publicPath: true,
  };
  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, {
    contentBase: config.outputdir,
    hot: true,
    proxy: {
      '*': `http://localhost:${port + 1}`,
    },
    publicPath: config.publicPath,
    stats: statsOptions,
  });

  const server = require('./server');
  devServer.middleware.waitUntilValid(() => {
    server.listen(port + 1, '0.0.0.0', function runServer() {
      console.info('server/index', `server is listening at ${JSON.stringify(this.address())}`);
    });
  });
  devServer.listen(port, '0.0.0.0', function runDevServer() {
    console.info(
      'server/index',
      `webpack dev server is listening at ${JSON.stringify(this.address())}`
    );
  });
} else {
  const server = require('./server');
  server.listen(port, '0.0.0.0', function runServer() {
    console.info('server/index', `server is listening at ${JSON.stringify(this.address())}`);
  });
}
