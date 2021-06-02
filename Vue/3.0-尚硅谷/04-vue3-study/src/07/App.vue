<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName" /><br />
    名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" /><br />
  </fieldset>

  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名：<input type="text" placeholder="显示姓名" :value="userName1" /><br />
    姓名：<input type="text" placeholder="显示姓名" v-model="userName2"/><br />
    姓名：<input type="text" placeholder="显示姓名" v-model="userName3"/><br />
    姓名：<input type="text" placeholder="显示姓名" v-model="userName4"/><br />
  </fieldset>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';

export default defineComponent({
  setup() {
    const user = reactive({
      firstName: 'ardor',
      lastName: 'zhang',
    });
    const userName1 = computed(() => user.firstName + '-' + user.lastName);

    const userName2 = computed({
      get: () => user.firstName + '-' + user.lastName,
      set: (val) => {
        const [first, last] = val.split('-');
        user.firstName = first;
        user.lastName = last;
      }
    });

    // 监视
    const userName3 = ref('');
    watch(user, ({ firstName, lastName }) => {
      userName3.value = firstName + '-' + lastName;
    }, { immediate: true, deep: true });
    watch(userName3, val => {
      const [first, last] = val.split('-');
      user.firstName = first;
      user.lastName = last;
    });

    // watchEffect
    const userName4 = ref('');
    watchEffect(() => {
      userName4.value = user.firstName + '-' + user.lastName;
    });

    watchEffect(() => {
      const [first, last] = userName4.value.split('-');
      user.firstName = first;
      user.lastName = last;
    });

    // setInterval(() => {
    //   user.firstName = Date.now();
    // }, 1000);

    // watch(() => user.firstName, () => {
    //   console.log('1111111');
    // });

    return {
      user,
      userName1,
      userName2,
      userName3,
      userName4,
    }
  },
})
</script>
