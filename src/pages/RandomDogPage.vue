<template>
  <section class="random-dog">
    <h1>Случайная собачка</h1>

    <div class="random-dog__buttons">
      <button v-for="item in categories" :key="item"
              :class="{'active': item.active}"
              @click="onChangeBreed(item)"
      >
        {{ item.name }}
      </button>
    </div>

    <div class="random-dog__content">
      <img class="random-dog__content-img" :src="dogs[dogs.length - 1]?.src" loading="lazy" alt="Фото собачки">
      <div class="info">
        <h3>Порода: {{ currentItemName }}</h3>

        <button @click="previousDog"
                :disabled="disabled"
        >
          back
        </button>
        <button @click="fetchDog(currentItemType)">next</button>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {Dogs} from "@/interface.ts";

const categories = ref([
    {name: 'Мопс', type: 'pug', active: true},
    {name: 'Корги', type: 'corgi', active: false},
    {name: 'Мастифф', type: 'mastiff', active: false},
    {name: 'Лабрадор', type: 'labrador', active: false},
    {name: 'Шиба', type: 'shiba', active: false},
    {name: 'Хаски', type: 'husky', active: false},
    {name: 'Овчарка', type: 'ovcharka', active: false},
])

const dogs = ref<Dogs[]>([]);
const currentItemType = ref<string>('pug');
const currentItemName = ref<string>('Мопс');

const disabled = ref<boolean>(true);
const fetchDog = async (breed: string) => {
    try {
        const response = await axios.get<object>(`https://dog.ceo/api/breed/${breed}/images/random`);
        dogs.value.push({
            src: response.data.message,
            name: currentItemName.value,
            type: currentItemType.value
        });
    } catch (e: string) {
        console.log('Ошибка', e)
    } finally {
        if (dogs.value.length >= 2) disabled.value = false;
    }
};
const previousDog = () => {
    dogs.value.pop();
    onChangeActiveButton(dogs.value[dogs.value.length - 1]);
    if (dogs.value.length === 1) return disabled.value = true;
};
const onChangeBreed = (item: object) => {
    if (currentItemType.value !== item.type) {
        onChangeActiveButton(item)
        fetchDog(currentItemType.value)
    }
}
const onChangeActiveButton = (item: object) => {
    categories.value.forEach(el => el.active = false);
    categories.value.find(el => el.type === item.type).active = true;

    currentItemType.value = item.type;
    currentItemName.value = item.name;
}

onMounted(() => {
    fetchDog(currentItemType.value);
})

</script>

<style lang="scss">
.random-dog {
  &__buttons {
    padding: 12px 1px;
    display: flex;
    gap: 12px;

    overflow: scroll;

    @include up($md) {
        overflow: auto;
      padding: unset;
    }
  }

  &__content {
    margin-top: 24px;
    padding: 24px;
    border-radius: 12px;

    display: grid;
    gap: 24px;

    background-color: rgba(255, 255, 255, 0.1);

    @include up($md) {
      grid-template-columns: 3fr 1fr;
    }

    &-img {
      width: 100%;
      border-radius: 8px;
      aspect-ratio: 1;

      object-fit: cover;

      @include up($sm) {
        aspect-ratio: 16/9;
      }
    }

    .info {
      button {
        margin-top: 12px;

        &:last-child {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
