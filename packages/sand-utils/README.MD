## @jianghe/sand-utils

> sand 工具类

### fetch 工具

基于 axios 的 http 请求工具

```javascript
import { fetch } from '@jianghe/sand-utils';

const { request, get, post } = fetch;

// 基础的请求方法
request('url', {
  method: 'POST',
  data: { ss: 111 },
  //...
});

// get请求
get('url', { ss: 111 }, { timeout: 5000 });

// post请求
post('url', { ss: 111 }, { timeout: 5000 });
```

### html encode/decode 工具

用于 html encode/decode

```javascript
import { decodeHtml } from '@jianghe/sand-utils';

const html = decodeHtml('111');
```

### debug 工具

用于 debug 日志输出，基于 debug 库

```javascript
import { debug } from '@jianghe/sand-utils';
```
