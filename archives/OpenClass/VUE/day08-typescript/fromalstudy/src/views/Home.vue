<template>
  <div class="home">
    <h1>This is an home page</h1>
    <TS />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TS from "@/components/TS.vue";

@Component({ components:{ TS } })
export default class Home extends Vue {}
</script>
