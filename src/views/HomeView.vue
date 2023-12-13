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
        <span> {{ person.name }} </span> | <span> {{ person.height }} </span> |
        <span> {{ person.mass }} </span> |
        <span> {{ person.hairColor }} </span> | <button>Delete</button>
        <button>Tofavourites</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { getAllPersons, searchPerson } from "@/api";

import type { Person } from "@/types";

const starWarsPersons = ref<Array<Person>>([]);

const search = ref<string>("");
const searchPersonResult = ref<Array<Person>>([]);

let debounceValue: number | undefined;

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

onMounted(async () => {
  starWarsPersons.value = await getAllPersons();
  console.log(starWarsPersons.value);
});
</script>
