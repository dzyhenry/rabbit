import xtend from 'xtend';
import xhrRequest from 'xhr-request';

import httpHandlerEnhancer from './httpHandlerEnhancer';

const emptyFunction = () => {};

const createRequest = (uri, opts, cb = emptyFunction) =>
  xhrRequest(
    uri,
    xtend(opts, {
      headers: xtend(opts.headers, {
        'x-requested-with': 'XMLHttpRequest',
      }),
    }),
    httpHandlerEnhancer(cb)
  );

export default createRequest;
