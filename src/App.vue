<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/favourites">Favourites</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { getAllPersons, getFavouritesFromLocalStorage } from "./composables";

onMounted(async () => {
  getFavouritesFromLocalStorage();
  await getAllPersons();
});
</script>

<style lang="scss">
#app {
  @aplly bg-primary-content;
}

nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
