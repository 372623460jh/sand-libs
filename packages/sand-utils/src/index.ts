import request, { get, post } from './fetch';
import debug from './debug';
import { decodeHtml } from './encodeHtml';
import { throttle, debounce } from './func';

const fetch = {
  request,
  get,
  post,
};

export { fetch, debug, decodeHtml, throttle, debounce };
