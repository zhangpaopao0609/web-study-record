<template>
    <div>
        <!-- ts特性列表 -->
				<div><input type="text" @keydown.enter="addFeature"></div>
				<div>特性总数： {{ count }}</div>
        <ul>
            <li v-for="(item, index) in features" :key="index">
              {{ item }}
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ComponentName extends Vue {
  // 属性就是data
	features: Array<string> = [];

	// 存取器可以作为计算属性
	get count() {
		return this.features.length;
	}

	// 函数作为回调
	addFeature(e: KeyboardEvent): void {
		const inp = e.target as HTMLInputElement;
		this.features.push(inp.value);
		inp.value = '';
	}
	// 
	created() {
		this.features = ['类型注解', '编译型语言'];
	}
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">

</style>