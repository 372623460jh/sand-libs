/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {
  error as logError,
  req as logReq,
  res as logResponse,
} from '../debug/index';

/**
 * axios请求的默认配置
 */
const DEFAULTS = {
  // 请求方法
  method: 'GET',
  // 返回类型
  responseType: 'json',
  // 返回编码
  responseEncoding: 'utf8',
  // 请求头，content-type之类的在header中设置
  headers: {
    'X-Requested-With': false, // 不发送options请求跨域的方式
    'content-type': 'application/json;charset=utf8', // content-type是json
  },
  // 超时时长ms
  timeout: 10000,
  // 支持跨域带cookie
  withCredentials: true,
};

/**
 * 请求数据的方法
 * @param {*} url 地址
 * @param {*} options 选项
 */
export default function request(
  url: string,
  params: any,
  handerRes: any
): Promise<any> {
  // 请求
  const reqParams = {
    ...DEFAULTS,
    url,
    ...params,
  };

  // 打印请求日志
  logReq(url, reqParams);

  /**
   * 控制台返回日志输出中间件
   * @param {*} res
   */
  function logRes(res) {
    logResponse(url, res);
    return res;
  }

  /**
   * 处理请求
   * @param {*} res
   */
  function handerResponse(res) {
    if (handerRes) {
      return handerRes(res);
    }
    return res;
  }

  /**
   * 通用异常处理中间件，如超时异常等
   * @param {*} err
   */
  function processError(err) {
    logError(url, reqParams, err);
    // 检测是否是abort:  https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
    const isAbort = err.xhr && err.xhr.status === 0 && err.xhr.readyState === 4;
    if (!isAbort) {
      let code = null;
      let { message = '' } = err;
      if (message === 'timeout') {
        message = '请求超时，请重试！';
        code = 'TIME_OUT';
      } else if (message.indexOf('Unexpected token') > -1) {
        // 出现那Unexpected token，很可能是服务端做了302跳转，请自定义规则
        message = '数据解析出错，请重试！';
        code = 'JSON_PARSE_ERROR';
      }
      if (!message) {
        message = '请求数据出错，请重试！';
        code = 'UNKNOWN_ERROR';
      }
      const error = new Error(message);
      error.code = code;
      return Promise.reject(error);
    }
    const error = new Error('请求被终止');
    error.code = 'ABORT';
    return Promise.reject(error);
  }

  return (
    axios({ ...reqParams })
      // 请求结果日志输出
      .then(logRes)
      // 处理请求返回
      .then(handerResponse)
      // 处理网络异常等报错
      .catch(processError)
  );
}

/**
 * get请求
 * @param {string} url      请求的url地址
 * @param {object} params   请求传递数据
 * @param {object} options  其他参数
 */
export function get(
  url: string,
  params: any,
  options = {},
  handerRes
): Promise<any> {
  return request(
    url,
    {
      method: 'GET',
      params,
      ...options,
    },
    handerRes
  );
}

/**
 * post请求
 * @param {string} url      请求的url地址
 * @param {object} params   请求传递数据
 * @param {object} options  其他参数
 * 如果服务端支持application/json options.contentType= 'json'
 */
export function post(
  url: string,
  params: any,
  options = {},
  handerRes
): Promise<any> {
  // 如果服务端支持application/json
  return request(
    url,
    {
      method: 'POST',
      data: params,
      ...options,
    },
    handerRes
  );
}
