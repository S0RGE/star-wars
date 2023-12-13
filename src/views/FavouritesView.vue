<template>
  <div class="about">
    <h1>This is an Favourites page</h1>
    <p v-for="person in starWarsFavouritesPersons" :key="person.name">
      {{ person.name }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { useStore } from "vuex";
const store = useStore();

const starWarsFavouritesPersons = computed(() => {
  return store.getters.getFavourites;
});
</script>
