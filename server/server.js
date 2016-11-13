
'use strict';

/* eslint no-console:0, global-require:0 */
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

const url = require('url');
const http = require('http');

const config = require('../config');
const rootdir = config.rootdir;

const error = require('./error');

const viewRouteSrcList = [
  `${rootdir}`,
  `${rootdir}/course`,
  `${rootdir}/course/*`,
];
const apiRouteSrcList = [
  `${rootdir}api/*`,
];
const stRouteSrcList = [
  `${rootdir}/*`,
];

// 路由设置
const routerpath = require.resolve('./router');
let router = require(routerpath);

// 主入口
function main(req, res) {
  const onerror = err => error(req, res, { body: err });

  const pathname = url.parse(req.url).pathname;
  let route = router.hash.get(pathname);

  console.info('server/server', `route.src is "${route.src}"`);

  if (process.env.NODE_ENV === 'development') {
    /**
     * 开发时可以选择清除 routerpath 的 require.cache
     * 重新 require routerpath 后可以更新 router, xxxRouter
     */
    const needClearRouteSrcList = [].concat(viewRouteSrcList).concat(apiRouteSrcList);
    if (needClearRouteSrcList.indexOf(route.src) !== -1) {
      require('clear-require-cache')(routerpath);
      router = require(routerpath);
      route = router.hash.get(pathname);
    }
  }

  const opts = {};
  opts.appName = config.appName;

  if (stRouteSrcList.indexOf(route.src) !== -1) {
    router(req, res, opts, onerror);
    return;
  }

  if (apiRouteSrcList.indexOf(route.src) !== -1) {
    router(req, res, opts, onerror);
    return;
  }

  router(req, res, opts, onerror);
}

const server = http.createServer(main);
server.setTimeout(10000);

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('uncaughtException', (err) => console.error('uncaughtException', err.stack));
process.on('uncaughtException', () => server.close(() => process.exit(1)));

module.exports = server;

if (require.main === module) {
  const port = require('./port');
  server.listen(port, '0.0.0.0', function runServer() {
    console.info(`server is listening at ${JSON.stringify(this.address())}`);
  });
}
