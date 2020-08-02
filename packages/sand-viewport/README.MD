## @jianghe/sand-viewport 用法.

> 执行 setViewport 会在 head 中增加一个 meta 标签

```javascript
import setViewport from '@jianghe/sand-viewport';

// 7.5rem === 100vw
const { htmlFontSize } = setViewport(7.5);

// htmlFontSize表示设置在body上的字体大小是多大
```
