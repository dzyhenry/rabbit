/* eslint no-use-before-define:1, global-require:1 */
'use strict';
const config = require('../../config');
const sendHtml = require('send-data/html');
const revisions = require('../../app-revisions.json');
/**
 * 采用 http-hash-router 约定的请求 handler 定义格式
 * https://github.com/Matt-Esch/http-hash-router#routerreq-res-opts-cb
 */
function view(req, res, opts, cb) {
  const appName = opts.appName;
  let stylesheets = [];
  if (revisions && revisions[`${appName}.css`]) {
    stylesheets.push(
      `<link href="${config.publicPath}${revisions[`${appName}.css`]}" rel="stylesheet" />`
    );
  }
  stylesheets = stylesheets.length > 0 ? ['    '].concat(stylesheets).join('\n    ') : '';
  let javascripts = [
    `<script src="${config.publicPath}${revisions[`${appName}.js`]}"></script>`,
  ];
  if (process.env.NODE_ENV === 'development') {
    javascripts.push('<script src="/webpack-dev-server.js"></script>');
  }
  javascripts = javascripts.join('\n    ');
  const html = `<!doctype html>
<html lang="zh-hans">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      name="viewport"
    />
    <title>${appName}</title>
    <link rel="icon" href="/favicon.ico" />
    ${stylesheets}
  </head>
  <body>
    <div id="app"></div>
    ${javascripts}
  </body>
</html>
  `;
  sendHtml(req, res, html, cb);
}

module.exports = view;
