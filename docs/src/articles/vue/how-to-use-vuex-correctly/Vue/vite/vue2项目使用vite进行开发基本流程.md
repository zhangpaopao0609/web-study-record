[toc]

# vue2项目使用vite进行开发基本流程

## 1. vite简介

vite 开发环境基于浏览器支持 dynamic import，使得启动速度快得惊人，同时支持任意类型文件的解析（提供解析loder即可）；生成环境使用 Rollup打包。因此我们的尤大神说，2021年前端有什么新的的变化就是 “会有很多人抛弃webpack开始使用 vite”。

那下面来讲讲如何在我们的 vue2 项目中使用 vite吧。

## 2. vue2 中使用 vite

### 2.1 vite vue 的安装

```bash
yarn add vite vue
```

### 2.2 启动命令 

```js
"scripts": {
  "dev": "vite",
  "build": "vite build"
},
```

 vite命令会去找到根目录下的 “vite.config.js” ，跟 webpack是同样的流程。

### 2.3 vite.config.js

在vue2.x 中，需要添加支持 vue2.x 的插件

```js
yarn add vite-plugin-vue2 --dev   

// vite.config.js  
import { createVuePlugin } from "vite-plugin-vue2";   
export default {  plugins: [createVuePlugin(/*options*/)]  }  

// 这里的 options 可配置 vueTemplateOptions， jsx  
// 详情查看 https://github.com/underfin/vite-plugin-vue2
```

这里可配置大量的option,跟 webpack 有些类似，比如 root，默认为 process.cwd()， 所以，vite 获取根目录下找 index.html，更多配置可到 https://vitejs.dev/config/#conditional-config 查看。

### 2.4 index.html

```html
<body>
  <div id="app"></div>
  <script src="./src/index.js" type="module"></script>
</body>
```

index.js 中自然是 vue2 的主入口了，这里需要特别主要的是，我们平时使用 webpack 的时候会省略文件的后缀名，但 vite 暂不能省略（或许有办法可以配置，但暂时没看到）。

### 2.5 项目中使用 scss

直接安装 sass 即可

```
yarn add sass -D
```

### 2.6 使用缩写

需要在 vite.config.js 中添加如下配置

```js
import { createVuePlugin } from "vite-plugin-vue2";

export default {
  plugins: [createVuePlugin()],
  resolve: {
    alias: [
      { find: 'UTIL',  replacement: '/src/utils'}
    ]
  }
}
```

代码中即可使用如 ` import logger from "UTIL/logger.js"`

### 2.7 vue2 中使用 class component 的写法

首先安装 vue-class-component，然后按照语法写，正常启动，但是由于 class component 使用了 @ （装饰器），但 vite 在解析过程中不认识这个 @， 我目前的解决方案是 在 script中添加 lang="ts"

```js
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import logger from "UTIL/logger.js";

@Component
export default class ClassComponent extends Vue {
  count = 0

  increment() {
    this.count++
  }

  created() {
    logger("this is ClassComponent")
  }
}
</script>
```

方案虽然能解决问题，但是还需要找到根本原因。

为了更好的使用 class-component 的语法， 有时候我们会用 vue-property-decorator，不过在 使用 vue-property-decorator时，一定要安装vue-class-component，否者会出现createDecorator的错误

### 2.8 使用 ts

需要注意一点，vite 中 ts 只做文件转移，不做类型检查，类型检查交给了IDE 和打包过程。

ts 自然需要添加 ts.config.json。因为存在推断，所以使用缩写这里也需要添加

```json
{
  "include": [
    "src/**/*",
    "src/index.ts",
    "src/vue-shim.d.ts"
  ],
  "exclude": ["node_modules", "src/app/assets/**/*"],
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "allowJs": true,
    "module": "esnext",
    "target": "es5",
    "moduleResolution": "node",
    "isolatedModules": true,
    "lib": ["dom", "es5", "es2015.promise"],
    "sourceMap": true,
    "pretty": true,
    "paths": {
      "UTIL/*": ["src/util/*"]
    },
  }
}
```

