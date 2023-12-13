<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/favourites">Favourites</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { getFavouritesFromLocalStorage } from "@/composables";

onMounted(async () => {
  getFavouritesFromLocalStorage();
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

h1 {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 2em;
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
