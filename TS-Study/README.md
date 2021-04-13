# TS-Study

## 局部安装 typescript 和 使用
1. 安装
```bash
npm install -D typescript --registry=https://registry.npm.taobao.org

# 或者
yarn add -D typescript --registry=https://registry.npm.taobao.org
```
2. 使用
```bash
npx tsc helloworld.ts
```
运行后 ts 文件就会被编译成 js 文件。

3. 监视 .ts 文件
```bash
npx tsc helloworld.ts -w
```
4. 根据 tsconfig.json 来编译
```bash
tsc --init   # 生成默认配置文件
```
```bash
npx tsc -w [-p tsconfig.json_Path]   # 默认采用根目录下的 tsconfig.json，跟 webpack.config.js 一样
```