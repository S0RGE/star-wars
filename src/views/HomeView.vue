<template>
  <div class="home container">
    <h1>Star wars Persons</h1>
    <div class="home-content" v-if="!fetchingError">
      <div>
        <div class="form-control w-full max-w-xs home__search">
          <input
            type="text"
            placeholder="Type character name"
            class="input w-full max-w-xs"
            v-model="search"
          />
          <div class="home__search-result" v-if="search.length >= 3">
            <ul
              class="p-2 shadow menu rounded-box w-52"
              v-if="searchPersonResult.length"
            >
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
            <span v-else class="loading loading-spinner loading-sm"></span>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div v-if="!isLoading">
        <persons-table :starWarsPersons="starWarsPersons" />
        <div class="join table-pagination">
          <button class="join-item btn btn-outline" @click="fetchPreviousPage">
            Previous page
          </button>
          <button class="join-item btn btn-outline" @click="fetchNextPage">
            Next
          </button>
        </div>
      </div>
      <div v-else class="loader">
        <span class="loading loading-dots loading-lg"></span>
      </div>
    </div>
    <div v-else class="home__error">
      <h3>
        Something went wrong, try again
        <button
          @click="getAllPersons"
          class="btn btn-sm btn-outline btn-primary"
        >
          Retry
        </button>
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import PersonsTable from "@/components/PersonsTable.vue";
import { searchPerson, fetchAllPersons } from "@/api";
import { getPersonId } from "@/helpers/parsing";

import type { Result, Person } from "@/types";

const isLoading = ref<boolean>(false);
const fetchingError = ref<string>("");

const starWarsPersons = ref<Array<Person>>([]);

const getAllPersons = async (): Promise<void> => {
  isLoading.value = true;
  fetchingError.value = "";
  try {
    const result: Result<Person> = await fetchAllPersons();
    starWarsPersons.value = result.results as Array<Person>;
    nextPage.value = result.next;
    previousPage.value = result.previous;
  } catch (error) {
    fetchingError.value = error as string;
    console.error(error);
  }
  isLoading.value = false;
};

// Pagination
const nextPage = ref<string | null>(null);
const previousPage = ref<string | null>(null);

const fetchNextPage = async (): Promise<void> => {
  if (!nextPage.value) {
    return;
  }
  isLoading.value = true;
  try {
    const result: Result<Person> = await fetchAllPersons(nextPage.value);
    starWarsPersons.value = result.results;
    nextPage.value = result.next;
    previousPage.value = result.previous;
  } catch (error) {
    fetchingError.value = error as string;
    console.error(error);
  }
  isLoading.value = false;
};

const fetchPreviousPage = async (): Promise<void> => {
  if (!previousPage.value) {
    return;
  }
  isLoading.value = true;
  try {
    const result: Result<Person> = await fetchAllPersons(previousPage.value);
    starWarsPersons.value = result.results;
    nextPage.value = result.next;
    previousPage.value = result.previous;
  } catch (error) {
    fetchingError.value = error as string;
    console.error(error);
  }
  isLoading.value = false;
};

// Searching person by name
const search = ref<string>("");
const searchPersonResult = ref<Array<Person>>([]);

let debounceValue: number | undefined;

watch(search, async () => {
  if (search.value.trim().length < 3) {
    return;
  }

  clearTimeout(debounceValue);
  debounceValue = setTimeout(async () => {
    try {
      const findedPersons = await searchPerson(search.value);
      searchPersonResult.value = findedPersons;
    } catch (error) {
      fetchingError.value = error as string;
      console.error(error);
    }
  }, 500);
});

onMounted(async () => {
  await getAllPersons();
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

    span {
      display: block;
      margin: 1em auto;
    }
  }

  .table-pagination {
    @apply flex justify-center items-center mt-3;
  }

  &__error {
    @apply mt-4;
    text-align: center;
  }
}
</style>
