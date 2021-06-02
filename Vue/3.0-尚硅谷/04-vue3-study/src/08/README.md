# 生命周期
与 2.x 版本生命周期相对应的组合式 API
- <s>beforeCreate</s> -> 使用setup()
- <s>created</s> -> 使用setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestory -> onBeforeDestory
- destroyed -> onUnmounted
- errorCaptured -> onErrorCaptured

# 新增的钩子函数
除了和 2.x 生命周期等效项之外，组合 API 还提供了以下调试钩子函数
- onRenderTracked
- onRenderTrigger

# 3.0 的生命周期比 2.0 的生命周期更快
2.x 中的 beforeCreate
2.x 中的 created
3.x 中的 onBeforeMount
2.x 中的 beforeMount
3.x 中的 onMounted
2.x 中的 mounted
3.x 中的 onBeforeUpdate
2.x 中的 beforeUpdate
3.x 中的 onUpdated
2.x 中的 updated
3.x 中的 onBeforeUnmount
2.x 中的 beforeUnmount
3.x 中的 onUnmounted
2.x 中的 unmounted