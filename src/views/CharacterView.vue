<template>
  <div class="person-page">
    <h1>Person page</h1>
    <div class="hero min-h-screen bg-base-200" v-if="currentPerson">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold text-center">
            {{ currentPerson?.name }}
          </h1>
          <p class="py-6" v-for="(key, value) in currentPerson" :key="key">
            <span v-if="value !== 'name'"> {{ value }}: {{ key }} </span>
          </p>
          <div class="person-page__actions">
            <button
              v-if="!isFavourite"
              @click="addPersonToFavourites(currentPerson)"
              class="btn btn-primary"
            >
              Add to Favourites
            </button>
            <button
              v-else
              class="btn btn-error"
              @click="deletePersonFromFavourites(currentPerson)"
            >
              Remove from Favourites
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loader">
      <span class="loading loading-dots loading-lg"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useRoute } from "vue-router";
const route = useRoute();

import { useStore } from "vuex";
const store = useStore();

import { fetchPerson } from "@/api";
import { Person } from "@/types";

const currentPerson = ref<Person>();

const isFavourite = computed(() => {
  return store.getters.isPersonInFavourites(currentPerson.value);
});

const deletePersonFromFavourites = (person: Person) => {
  store.dispatch("deletePersonFromFavourites", person);
};

const addPersonToFavourites = (person: Person) => {
  store.dispatch("addPersonToFavourites", person);
};

onMounted(async () => {
  const id = route.params.id as string;
  currentPerson.value = await fetchPerson(id);
});
</script>

<style scoped>
.person-page {
  &__actions {
    margin: 2em 0 2em 0;
  }
}
</style>
