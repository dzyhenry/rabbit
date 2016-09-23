const httpHashMocker = require('http-hash-mocker');
const config = require('../../config');
const rootdir = config.rootdir;
const basedir = config.basedir;

const mocker = httpHashMocker({ basedir, rootdir });

module.exports = mocker;
