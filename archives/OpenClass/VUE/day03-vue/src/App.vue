<script>
export default {
  name: 'App',
  methods: {
    add() {
      this.$store.commit('num/ADD_COUNT', { num: 2 });
    },
    async asyncAdd() {
      // this.$store.dispatch('ASYNC_ADD').then(res => {
      //   if(res.ok === 1) {
      //     alert('111');
      //   }
      // });
      const res = await this.$store.dispatch('num/ASYNC_ADD');
      if (res.ok === 1) {
        alert('11111');
      }
    },
  },

};
</script>

<template>
  <div id="app">
    app
    <comp />
    <hr>
    {{ $store.state.num.count }}
    {{ $store.getters['num/score'] }}
    <div>
      <button @click="add">
        add
      </button>
    </div>
    <div>
      <button @click="asyncAdd">
        asyncAdd
      </button>
    </div>
  </div>
</template>

<style>

</style>
