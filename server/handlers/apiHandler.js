'use strict';
const url = require('url');
const qs = require('querystring');

const xtend = require('xtend');
const hyperquest = require('hyperquest');

const config = require('../../config');
const hosts = require('./hosts');

const seperator = '/-/';
const rootdir = config.rootdir;

function hyperapi(req, res, opts, cb) {
  const log = opts.logger || console;
  const method = req.method;
  let uri = req.url;

  // /rootdir/api/name/-/path/to/resource
  // ${rootdir}api/${apiName}${seperator}${apiUri}
  const pos = uri.indexOf(seperator);
  const splats = uri.slice(0, pos).split('/');
  const name = splats[splats.length - 1];

  let host = hosts[name];
  if (typeof host === 'function') {
    host = host(req);
  }

  if (!host) {
    throw Error('ERROR: HOST is not defined.');
  }

  const sliced = req.url.slice(`${rootdir}api/${name}/-`.length);
  const parsed = url.parse(sliced, true);
  const used = xtend(parsed, {
    query: parsed.query,
  });
  uri = `${host}${used.pathname}?${qs.stringify(used.query)}`;

  log.info('hyperdata', method, uri, JSON.stringify(req.headers));

  const s = hyperquest(uri, { method, headers: req.headers });
  s.on('error', cb);
  res.once('finish', cb);
  s.on('response', (response) => {
    res.writeHead(response.statusCode, response.headers);
  });

  if (s.writable) {
    req.pipe(s);
  }
  s.pipe(res);
}

module.exports = hyperapi;
