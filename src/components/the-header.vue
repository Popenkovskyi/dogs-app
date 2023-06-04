<template>
  <header class="the-header">
    <nav class="the-header__nav">
      <router-link :to="{name: 'HomePage'}">Главная</router-link>
      <router-link :to="{name: 'RandomDogPage'}">Случайная собачка</router-link>
    </nav>
  </header>
</template>
<script>
</script>

<style lang="scss">
.the-header {
  max-width: 1920px;
  padding: 12px 24px;
  margin-inline: auto;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 4;

  background-color: #242424;

  &__nav {
    display: flex;
    justify-content: space-between;

    @include up($md) {
      justify-content: flex-start;
      gap: 24px;
    }
  }
}
</style>
