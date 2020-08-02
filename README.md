# sand 基础工具库

## 指令

- npm run init: 删除 node_modules,和 lib 的构建产物，并重新安装，构建
- npm run clean: 删除 node_modules,和 lib 的构建产物
- npm run build: 构建
- npm run build:watch: 构建(监听)
- npm run build:production: 构建(生产环境)
- npm run start: 启动 lib 调试服务
- npm run publish: 推包到 npm
- npm run ci: lint&&test

## 库

### sand-mystery（加解密工具包）

加解密工具

#### 加密 demo.

```shell
node ./bin/sand-mystery.js encrypt /Users/jianghe/Desktop/jianghe_ws/mergeFile/examples/input/image/3.png /Users/jianghe/Desktop/jianghe_ws/mergeFile/examples/input/file/project /Users/jianghe/Desktop/jianghe_ws/mergeFile/examples/output/encrypt/ss.png 1472583690zx -n jianghe
```

#### 解密 demo

```shell
node ./bin/sand-mystery.js decrypt /Users/jianghe/Desktop/jianghe_ws/mergeFile/examples/output/encrypt/ss.png /Users/jianghe/Desktop/jianghe_ws/mergeFile/examples/output/decrypt 1472583690zx 16110 -n jianghe
```
