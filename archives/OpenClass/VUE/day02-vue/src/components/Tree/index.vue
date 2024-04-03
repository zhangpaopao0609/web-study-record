<script>
import Item from './Item';

export default {
  name: 'App',
  components: { Item },
  data() {
    return {
      treeData: {
        title: 'Web全栈架构师',
        children: [
          {
            title: 'Java架构师',
          },
          {
            title: 'JS高级',
            children: [
              {
                title: 'ES6',
              },
              {
                title: '动效',
              },
            ],
          },
          {
            title: 'Web全栈',
            children: [
              {
                title: 'Vue训练营',
                expand: true,
                children: [
                  {
                    title: '组件化',
                  },
                  {
                    title: '源码',
                  },
                  {
                    title: 'docker部署',
                  },
                ],
              },
              {
                title: 'React',
                children: [
                  {
                    title: 'JSX',
                  },
                  {
                    title: '虚拟DOM',
                  },
                ],
              },
              {
                title: 'Node',
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<template>
  <div id="app">
    <ul>
      <Item class="item" :model="treeData" />
    </ul>
  </div>
</template>
