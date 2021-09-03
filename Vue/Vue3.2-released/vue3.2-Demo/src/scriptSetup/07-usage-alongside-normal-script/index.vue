<script lang="ts">
// 普通 <script>, 在模块范围下执行，仅在组件引入时执行一次
// runSideEffectOnce()

// 声明额外的选项
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup lang="ts">
// 在 setup() 作用域中执行，每次实例创建时都会执行
</script>