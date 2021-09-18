<template>
  <ul>
    <li>{{ userInfo.name }}</li>
    <li>{{ userInfo.age }}</li>
    <li>{{ userInfo.gender }}</li>
    <li>{{ userInfo.more }}</li>
  </ul>
  <div>
    <button @click="updateUserName">名字更新</button>
    <button @click="addMore">addMore</button>
    <button @click="deleteOne">deleteOne</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const obj = {
      name: 'arodr',
      age: 18,
      gender: 'man',
    };

    const userInfo = reactive(obj);

    const updateUserName = () => {
      userInfo.name = userInfo.name + Math.random();
    };

    const addMore = () => {
      userInfo.more = 'more' + Date.now();
    };

    const deleteOne = () => {
      delete userInfo.name;
    };

    console.log(userInfo);

    return {
      userInfo,
      updateUserName,
      addMore,
      deleteOne,
    };
  },
})
</script>
