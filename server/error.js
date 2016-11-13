
'use strict';

/* eslint no-console:0, global-require:0 */
const sendHtml = require('send-data/html');

const html404 = `
<!doctype HTML>
<html>
  <head>
    <title>
      对不起，我迷路了……
    </title>
    <meta charset="utf-8" />
  </head>
  <body style="background-color: #F9F9F9;">
    <div style="margin-top: 100px; text-align: center;">
      <a style="font-size: 20px;" href="/">返回首页</a>
    </div>
  </body>
</html>
`;
const html5xx = `
<!doctype HTML>
<html>
  <head>
    <title>
      对不起，我出错了……
    </title>
    <meta charset="utf-8" />
  </head>
  <body style="background-color: #F9F9F9;">
    <div style="margin-top: 100px; text-align: center;">
      <h1>对不起，我出错了……<br/><br/>请刷新页面或稍等片刻再访问</h1>
    </div>
  </body>
</html>
`;

function error(req, res, opts) {
  const err = opts.body;
  if (!err) {
    return;
  }

  // 打印错误日志
  if (process.env.NODE_ENV === 'development') {
    console.error('server/error', err.stack || err.toString());
  } else {
    console.error('server/error', JSON.stringify(err.stack || err.toString()));
  }

  // 输出错误页面
  if (!res.finished) {
    if (process.env.NODE_ENV === 'development') {
      const statusCode = err.statusCode || 500;
      const body = `<pre>${err.stack || err.toString()}</pre>`;
      sendHtml(req, res, { statusCode, body });
      return;
    }

    /* eslint no-param-reassign: 0 */
    if (err.statusCode === 404) {
      res.statusCode = '404';
      sendHtml(req, res, html404);
    } else {
      res.statusCode = '500';
      sendHtml(req, res, html5xx);
    }
  }
}

module.exports = error;
