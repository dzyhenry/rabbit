/* eslint global-require:0 */
const httpHashRouter = require('http-hash-router');
const st = require('st');

// 共享配置
const config = require('../config');
const rootdir = config.rootdir;

// view服务
const viewHandler = require('./handlers/viewHandler');

const router = httpHashRouter();

// api 服务
const apiHandler = require('./handlers/apiHandler');
const mocker = require('./handlers/mocker');

// development环境且配置信息useMock为true时，使用mock数据
if (process.env.NODE_ENV === 'development' && config.useMock === true) {
  router.set(`${rootdir}api/*`, mocker);
} else {
  router.set(`${rootdir}api/*`, apiHandler);
}

// web page 渲染
router.set(`${rootdir}`, viewHandler);
router.set(`${rootdir}course`, viewHandler);
router.set(`${rootdir}course/*`, viewHandler);

// 静态资源
const stOpts = {
  url: config.rootdir,
  path: config.outputdir,
  cache: process.env.NODE_ENV !== 'development',
};
router.set(`${rootdir}/*`, st(stOpts));

module.exports = router;
