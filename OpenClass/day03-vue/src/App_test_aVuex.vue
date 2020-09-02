<template>
  <div id="app">
    <hr />
    {{ $store.state.count }}
    {{ $store.getters['score'] }}
    <div><button @click="add">add</button></div>
    <div><button @click="asyncAdd">asyncAdd</button></div>
  </div>
</template>

<script>

export default {
  name: "app",
  methods: {
    add() {
      this.$store.commit('ADD_COUNT', 2);
    },
    async asyncAdd() {
      // this.$store.dispatch('ASYNC_ADD').then(res => {
      //   if(res.ok === 1) {
      //     alert('111');
      //   }
      // });
      const res = await this.$store.dispatch('ASYNC_ADD');
      if(res.ok === 1) alert('11111');
    }
  }

};
</script>

<style>

</style>
