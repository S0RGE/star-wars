<template>
  <div v-if="starWarsPersons.length" class="home container">
    <h1 class="text-center">Star wars Persons</h1>
    <div>
      <div class="form-control w-full max-w-xs home__search">
        <input
          type="text"
          placeholder="Type character name"
          class="input w-full max-w-xs"
          v-model="search"
        />
        <div class="home__search-result" v-if="searchPersonResult.length">
          <ul class="p-2 shadow menu rounded-box w-52">
            <li
              v-for="person in searchPersonResult"
              :key="person.name"
              class="p-2"
            >
              <router-link
                :to="{
                  name: 'character',
                  params: { id: getPersonId(person.url) },
                }"
                >{{ person.name }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="divider"></div>
    </div>
    <div v-if="starWarsPersons.length">
      <persons-table :starWarsPersons="starWarsPersons" />
    </div>
  </div>
  <div v-else class="loader">
    <span class="loading loading-dots loading-lg"></span>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { searchPerson } from "@/api";
import PersonsTable from "@/components/PersonsTable.vue";
import { getPersonId } from "@/helpers/parsing";

import { useStore } from "vuex";
const store = useStore();

import type { Person } from "@/types";

const starWarsPersons = computed(() => {
  return store.getters.getStarWarPersons;
});

const search = ref<string>("");
const searchPersonResult = ref<Array<Person>>([]);

let debounceValue: number | undefined;

watch(search, async () => {
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

<style lang="scss">
.home {
  input {
    @apply input input-bordered;
    margin: 1em auto;
  }

  &__search {
    position: relative;
  }

  &__search-result {
    position: absolute;
    bottom: 1em;
    left: calc(50% - 130px);
    transform: translateY(100%);
    z-index: 100;
    width: 260px;

    ul {
      background-color: #f1f0f0 !important;
    }
  }
}
</style>
