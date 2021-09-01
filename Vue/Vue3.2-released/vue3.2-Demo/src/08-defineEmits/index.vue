<script setup lang="ts">
import DefineEmits from "./DefineEmits.vue";
import DefineEmitsWithTypeDeclaration from "./DefineEmitsWithTypeDeclaration.vue";
interface Click {
  id: string,
  val: number,
}

const handleClick = (val: string) => alert(`你点击了子组件的button: ${val}`);
const handleChange = (val: number) => alert(`你改变了组件checbox的状态: ${val}`);

const handleClickWithTypeDeclaration = (data: Click) => alert(`你点击了子组件的button: ${data.val}`, );
const handleChangeWithTypeDeclaration = (data: List.Basic) => alert(`你改变了组件checbox的状态: ${data.content}`);

</script>

<template>
  <h3>无类型检查</h3>
  <DefineEmits
    @handle-click="handleClick"
    @handle-change="handleChange"
  />
  <hr>
  <h3>具有完美的类型检查， 完美的支持 ts 类型检查</h3>
  <h4>同样受限于无法导入类型，可用 ts 自动扫描 types 文件以及 declare namesapce 自动导入实现</h4>
  <DefineEmitsWithTypeDeclaration
    @handle-click-with-type-declaration="handleClickWithTypeDeclaration"
    @handle-change-with-type-declaration="handleChangeWithTypeDeclaration"
  />
</template>

<style scoped lang="scss">

</style>