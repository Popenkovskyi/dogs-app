<template>
  <the-header></the-header>
  <main>
    <router-view/>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "../the-header.vue";
</script>

<style lang="scss">
main {
  padding-top: 52px;

  @include up($md) {
    padding-top: 88px;
  }
}
</style>
