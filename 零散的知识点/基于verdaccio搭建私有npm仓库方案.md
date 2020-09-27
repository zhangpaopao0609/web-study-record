[toc]

# 基于verdaccio搭建私有npm仓库方案

## 1. 前言

前端的生态已经十分繁荣了，随着需求越来越复杂，前端的应用也越来越大了，为了更好地服务解耦、团队协作等原因，一般大型前端应用，都会将项目分成几个服务来维护，而在这些服务中，一般都会存在大量相同组件，特别是UI部分的组件，很显然这些组件我们不应该在每个服务都copy一份，这样如果我要增加或更新某个组件，那么将会非常痛苦，因此，大部分的做法是将公共组件抽离出来。那么问题来了，抽离出来我应该放到哪儿呢？放到npm上肯定不合适，这是公司内部的组件，因此，普遍的做法是搭建npm私有仓库，实现公司内部私有库，简单来说，有以下好处：

1. 托管公司内部组件，实现私有化，并且易于管理和更新
2. 私有仓库一般使用公司内部服务器，下载速度杠杠的

## 2. 私有仓库搭建方案选择

直接介绍目前市面上免费的方案

1. DIY NPM PRIVATE REGIETER

   npm 官网提供了一种搭建私有仓库的方案，但是这种方案完全靠自己搭建，不论是时间还是健壮方面，都不推荐，[点击查看链接](https://docs.npmjs.com/misc/registry.html)

2. Git 

   利用Git来进行存储，在package.json中指定git仓库的URL即可，但是这种做法有以下不足

   1）package.json中填写与本项目无关的git仓库

   2）当git仓库为private时，需要HTTPS或SSH凭据，而且通常我们并没有每个团队的权限。

3. Sinopia

   verdaccio的前身，但是目前已经停止维护了

4. Cnpmjs.org

   cnpm搭建比较麻烦，[查看git](https://github.com/cnpm/cnpmjs.org)

5. [verdaccio](https://www.npmjs.com/package/verdaccio)

   Verdaccio是一个**简单的、无需配置**的本地私有npm仓库注册表。不需要数据库就可以开始了！Verdaccio提供了自己的小数据库，以及代理其他注册中心的能力（例如npmjs.org网站)，还可以缓存下载的模块。

   这也是本文推荐的搭建私有npm仓库的方案

## 3. 搭建步骤(非docker)

1. 一台公司内部的服务器，公司一般申请即可

2. Nodejs 安装

3. npm install -g verdaccio

4. 一旦安装，最需要执行cli即可

   ```bash
   $> verdaccio
   warn --- config file  - /home/.config/verdaccio/config.yaml
   warn --- http address - http://localhost:4873/ - verdaccio/4.5.0
   ```

   可以设置npm注册表的信息

   ```bash
   npm set registry http://localhost:4873/
   ```

   创建一个.npmc的注册文件

   ```bash
   //.npmrc
   registry=http://localhost:4873
   ```

   或者增加一个配置在package.json中

   ```js
   {
     "publishConfig": {
       "registry": "http://localhost:4873"
     }
   }
   ```

## 4. 基于docker搭建

1. 拉取docker image

   ```js
   docker pull verdaccio/verdaccio
   ```

2. 使用docker运行verdaccio

   ```js
   docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
   ```

   最后一个参数定义了使用哪个镜像。如果你没有拉取镜像，上面的code将拉取 dockerhub上 最新的verdaccio的镜像

## 5. 上传packages

1. 添加账号

   verdaccio允许任何人创建账号，若没有配置verdaccio的配置文件`config.yaml`，则默认任何注册了verdaccio的开发都有publish权限

   ```js
   // 添加账号
   npm adduser --registry your_address
   ```

2. 添加.npmrc

   ```js
   registry=your_address
   ```

3. npm publish

   注意每次更新后需要修改version



































































































































