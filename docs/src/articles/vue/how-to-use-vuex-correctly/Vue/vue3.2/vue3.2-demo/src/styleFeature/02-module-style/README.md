[toc]

# 02-module-style
设计和使用跟 Vue2.x 是一致的，因此也不多赘述。
唯一新的点是使用 `<script setup>` 时，可以使用 `useCssModule`  API 获取到 css module 对象。

```vue
<script setup lang="ts">
import { useCssModule } from "vue";
const css = useCssModule();
console.log(css);		// { blue: "_blue_13cse_5", red: "_red_13cse_2"}
</script>

<style module>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>
```

