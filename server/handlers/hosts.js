'use strict';
const port = require('../port');

function course() {
  let host;
  /**
   * NOTICE development 环境使用 mock 数据，即数据提供方是自己服务
   */
  if (process.env.NODE_ENV === 'production') {
    // 使用 st 域名（内网域名）
    // NOTICE 真正的服务应该使用 xxx.vip.sankuai.com 之类的域名
    host = '';
  } else if (process.env.NODE_ENV === 'release') {
    host = '';
  } else {
    host = `http://localhost:${port}`;
  }
  return host;
}

module.exports = { course };
