export default (cb) => (err, body, res) => {
  /* eslint no-param-reassign:0 */
  if (err) {
    console.error(err.message);
    cb(err, body, res);
    return;
  }

  if (res.statusCode === 403) {
    err = new Error('没有权限');
  } else if (res.statusCode !== 200) {
    err = new Error(`请求 ${res.url} 失败，请重试！`);
  } else if (!body) {
    err = new Error('response body 为空');
  }

  if (err) {
    console.error(err.message);
  }
  cb(err, body, res);
};
