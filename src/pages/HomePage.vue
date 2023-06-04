<template>
  <section class="home">
    <h1>Главная страница</h1>
    <div class="home__photos">

      <div v-for="item in dogs" :key="item.src"
           class="home__photo-card"
      >
        <img :src="item?.src" loading="lazy" alt="фото собакенa">
      </div>

    </div>

    <div ref="observerLoadMore" class="observer"></div>

  </section>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

import {Dogs} from "@/interface";
import {fetchDogs} from "@/use/fetch";

const dogs = ref<Dogs[]>([]);
const limit = ref<number>(0);

const observerLoadMore = ref<any>(null);

onMounted(() => {
    const options = {
        root: document.querySelector("#scrollArea"),
        rootMargin: "200px",
        threshold: 1.0,
    };
    const callback = (entries) => {
        if (entries[0].isIntersecting) {
            fetchDogs(dogs.value, limit.value)
        }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(observerLoadMore.value)
})
</script>

<style lang="scss">
.home {
  min-height: 100vh;

  &__photos {
    display: grid;
    gap: 4px;

    @include up($sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    @include up($md) {
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
  }

  &__photo-card {
    padding: 16px;
    border-radius: 12px;

    transition: background-color .2s ease;
    background-color: rgba(255, 255, 255, 0.1);

    cursor: pointer;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 8px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
