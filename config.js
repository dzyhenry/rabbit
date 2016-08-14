/* eslint no-var:0, no-console:0, object-shorthand:0 */
var path = require('path');

var basedir = path.resolve(__dirname);
var outputdir = path.resolve(basedir, 'public');
var rootdir = '/';
var publicPath = rootdir;

var appName = 'earth';

module.exports = {
  basedir: basedir,
  outputdir: outputdir,
  rootdir: rootdir,
  publicPath: publicPath,
  appName,
};

if (require.main === module) {
  console.log(module.exports);
}

