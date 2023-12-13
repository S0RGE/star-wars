<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/favourites">Favourites</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavouritesFromLocalStorage } from "@/composables";

onMounted(async () => {
  useGetFavouritesFromLocalStorage();
});
</script>

<style lang="scss">
#app {
  @aplly bg-primary-content;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1,
h2 {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin: 2em 0 2em 0;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
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
