<template>
  <div class="home">
    <h1>Star wars Persons</h1>
    <div>
      <input type="text" v-model="search" /> <br />
      <div v-if="searchPersonResult.length">
        <p v-for="person in searchPersonResult" :key="person.name">
          {{ person.name }}
        </p>
      </div>
    </div>
    <div v-if="starWarsPersons.length">
      <div v-for="person in starWarsPersons" :key="person.name">
        <span @click="logPersonId(person)"> {{ person.name }} </span> |
        <span> {{ person.height }} </span> | <span> {{ person.mass }} </span> |
        <span> {{ person.hairColor }} </span> |
        <button @click="deletePersonFromFavourites(person)">Delete</button>
        <button @click="addPersonToFavourites(person)">Tofavourites</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { searchPerson } from "@/api";
import { getPersonId } from "@/helpers/parsing";

import { useStore } from "vuex";
const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

import type { Person } from "@/types";

const starWarsPersons = computed(() => {
  return store.getters.getStarWarPersons;
});

const search = ref<string>("");
const searchPersonResult = ref<Array<Person>>([]);

let debounceValue: number | undefined;

const deletePersonFromFavourites = (person: Person) => {
  store.dispatch("deletePersonFromFavourites", person);
};

const addPersonToFavourites = (person: Person) => {
  store.dispatch("addPersonToFavourites", person);
};

const logPersonId = (person: Person) => {
  router.push({
    name: "character",
    params: {
      id: getPersonId(person.url),
    },
  });
  console.log(getPersonId(person.url));
};

watch(search, async () => {
  console.log(search.value);
  if (search.value.trim().length < 3) {
    return;
  }

  clearTimeout(debounceValue);
  debounceValue = setTimeout(async () => {
    const findedPersons = await searchPerson(search.value);
    searchPersonResult.value = findedPersons;
  }, 500);
});
</script>
