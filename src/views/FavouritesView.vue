<template>
  <div class="about container">
    <h1>This is an Favourites page</h1>
    <persons-table
      :starWarsPersons="starWarsFavouritesPersons"
      v-if="starWarsFavouritesPersons.length"
    />
    <div v-else>
      <h2>No Favourites</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import PersonsTable from "@/components/PersonsTable.vue";

import { useStore } from "vuex";
const store = useStore();

const starWarsFavouritesPersons = computed(() => {
  return store.getters.getFavourites;
});
</script>
