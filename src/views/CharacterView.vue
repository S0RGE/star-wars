<template>
  <div class="person-page">
    <h1>Person page</h1>
    <div class="hero min-h-screen bg-base-200" v-if="!isLoading">
      <div
        class="hero-content text-center"
        v-if="!fetchingError && currentPerson"
      >
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
      <div v-else class="person-page__error">
        <h3>
          Something went wrong, try again
          <button
            @click="getCurrentPerson"
            class="btn btn-sm btn-outline btn-primary"
          >
            Retry
          </button>
        </h3>
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
const isLoading = ref<boolean>(false);

const isFavourite = computed(() => {
  return store.getters.isPersonInFavourites(currentPerson.value);
});

const deletePersonFromFavourites = (person: Person) => {
  store.dispatch("deletePersonFromFavourites", person);
};

const addPersonToFavourites = (person: Person) => {
  store.dispatch("addPersonToFavourites", person);
};

const fetchingError = ref<string>("");

const getCurrentPerson = async () => {
  isLoading.value = true;
  fetchingError.value = "";
  const id = route.params.id as string;
  try {
    currentPerson.value = await fetchPerson(id);
  } catch (error) {
    fetchingError.value = error as string;
    console.error(error);
  }
  isLoading.value = false;
};

onMounted(async () => {
  await getCurrentPerson();
});
</script>

<style scoped lang="scss">
.person-page {
  &__actions {
    margin-top: 1em;
  }

  &__error {
    @apply mt-4;
    text-align: center;
  }
}
</style>
