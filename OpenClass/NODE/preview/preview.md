# Node 基础篇
## Node是什么
- 用于编写服务端应用
- JavaScript核心语法
- 只是操作的对象不同

前端 | DOM | 文档对象
------------ | ------------- | ----------
| BOM/DOM | 浏览器对象
| XMLHttpRequest/fetch | 网络通讯
后端 | os | 操作系统
| | process | 进程
| | fs | 文件系统
| | net | 网络通讯

## API哪里找
nodeJS
## 运行/调试、模块化
### bash 运行
```bash
node index.js
```
### Nodemon 自动重启
监视代码修改，自动重启
```bash
yarn global add nodemon
nodemon index.js
```
### Vscode debug

### 单元测试 Jest
安装jest库
```js
yarn global add jest
```

## 测试代码生成工具
- 掌握fs中的同步方法
- path包

生成测试文件名
