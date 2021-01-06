[toc]

# Vue中动态修改路由的params和query

## 1. 前言

​		经常在项目中需要动态的修改路由的 params 和 query，便于更好的传递到其它需要使用的页面。当然可以选择使用VueX来管理这两个参数，但是 VueX 所带来的的负担已经远远高于动态的修改路由了。

## 2. 动态修改

​		假设你需要动态修改的 params为 paramsDynamic, 需要动态修改的query 为 queryDynamic。

```js
this.$router.push({
  	params: {...this.$route.params, paramsDynamic: paramsDynamic} 
    query: {...this.$route.query, queryDynamic: queryDynamic} 
})
```

​		这也可用于添加query。