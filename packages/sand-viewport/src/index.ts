interface viewportInfo {
  htmlFontSize: number;
}

/**
 * 设置视口的库
 * @param {Number} [size = 10] - 100%的宽度等于多少rem 比如设置为10就是 10rem === 100vw
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px; 只有window.screen.width不生效时才有效
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体; 只有window.screen.width不生效时才有效
 */
function setViewport(
  size: number,
  baseFontSize: number,
  fontscale: number
): viewportInfo {
  const _size = size || 10;
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;
  const doc = window.document;

  // userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。.
  const ua = navigator.userAgent;

  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  // Android版本号
  const androidVersion = matches ? parseInt(matches[1]) || 0 : 0;

  // uc浏览器版本号
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  // 是不是uc浏览器
  const isUCHd =
    UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;

  // appVersion 属性可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = window.devicePixelRatio || 1;

  if (!isIos && !(androidVersion > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }

  //缩放比例
  const scale = 1 / dpr;

  /**
   * 设置html字体大小rem
   * @type {string}
   */
  let fontSize = 0;
  if (window.screen.width) {
    fontSize = (window.screen.width * dpr) / _size;
  } else {
    fontSize = (_baseFontSize / 2) * dpr * _fontscale;
  }
  doc.documentElement.style.fontSize = fontSize + 'px';

  /**
   * 根据dpr设置视口缩放比例
   * @type {Element}
   */
  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute(
    'content',
    'width=device-width,user-scalable=no,initial-scale=' +
      scale +
      ',maximum-scale=' +
      scale +
      ',minimum-scale=' +
      scale
  );

  return {
    htmlFontSize: fontSize,
  };
}

export default setViewport;
