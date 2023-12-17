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
      </div>
      <div v-else class="loader">
        <span class="loading loading-dots loading-lg"></span>
      </div>
    </div>
    <div v-else class="home__error">
      <h3>
        Something went wrong, try again
        <button
          @click="reloadHomePage"
          class="btn btn-sm btn-outline btn-primary"
        >
          Retry
        </button>
      </h3>
    </div>
    <div class="join table-pagination" v-if="maxPage > 1">
      <button
        v-for="i in maxPage"
        :key="i"
        @click="setCurrnetPage(i)"
        class="join-item btn"
        :class="{ 'btn-active': i === currentPage }"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted, computed } from "vue";
import PersonsTable from "@/components/PersonsTable.vue";
import { searchPerson } from "@/api";
import { getPersonId } from "@/helpers/parsing";
import { useStore } from "vuex";
import type { Person, FetchResult } from "@/types";

const store = useStore();

const isLoading = ref<boolean>(false);
const fetchingError = ref<string>("");

const starWarsPersons = computed(() => {
  return store.getters.getStarWarPersons[currentPage.value] || [];
});

const getStarWarPersons = async (page = 1): Promise<void> => {
  if (starWarsPersons.value.length) {
    return;
  }
  isLoading.value = true;
  fetchingError.value = "";
  currentPage.value = page;
  const response: FetchResult = await store.dispatch("getStarWarPersons", page);

  const { status, message } = response;

  if (status === "error") {
    fetchingError.value = message;
    return;
  }

  isLoading.value = false;
};

const reloadHomePage = async () => {
  fetchingError.value = "";
  currentPage.value = 1;
  await getStarWarPersons();
};

// Pagination
const currentPage = ref<number>(1);
const maxPage = computed(() => {
  const allPersons = store.state.personsCount;
  return Math.ceil(allPersons / 10);
});

const setCurrnetPage = (page: number) => {
  currentPage.value = page;
};

watch(currentPage, async () => {
  await getStarWarPersons(currentPage.value);
});

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
  await getStarWarPersons();
});
</script>

<style lang="scss" scoped>
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
