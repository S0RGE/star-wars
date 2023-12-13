<template>
  <div class="about">
    <h1>This is an Favourites page</h1>
    <persons-table :starWarsPersons="starWarsFavouritesPersons" />
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

<style lang="scss">
.about {
  max-width: 1200px;
  margin: 0 auto;
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 2em;
  }
}
</style>
