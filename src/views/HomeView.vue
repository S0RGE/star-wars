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
        @click="getStarWarPersons(i)"
        class="join-item btn"
        :class="{ 'btn-active': i === currentPage }"
      >
        {{ i }}
      </button>
    </div>
  </div>
  <button
    @click="scrollToTop"
    v-if="showTopButton"
    class="btn btn-active btn-accent top-button"
  >
    To top
  </button>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted, computed, onUnmounted } from "vue";
import PersonsTable from "@/components/PersonsTable.vue";
import { searchPerson } from "@/api";
import { getPersonId } from "@/helpers/parsing";
import { useStore } from "vuex";
import type { Person, FetchResult } from "@/types";

const store = useStore();

const isLoading = ref<boolean>(false);
const fetchingError = ref<string>("");

const starWarsPersons = computed(() => {
  return store.getters.getStarWarPersons;
});

const getStarWarPersons = async (page = 1): Promise<void> => {
  isLoading.value = true;
  fetchingError.value = "";
  currentPage.value = page;
  const response: FetchResult = await store.dispatch("getStarWarPersons", page);

  const { count, status, message } = response;

  if (status === "error") {
    fetchingError.value = message;
    return;
  }

  allPersons.value = count;

  isLoading.value = false;
};

const reloadHomePage = async () => {
  fetchingError.value = "";
  currentPage.value = 1;
  await getStarWarPersons();
};

// Pagination
const currentPage = ref<number>(1);
const allPersons = ref<number>(0);
const maxPage = computed(() => {
  return Math.ceil(allPersons.value / 10);
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

// Scroll to top
const showTopButton = ref<boolean>(false);
const handleScroll = () => {
  showTopButton.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(async () => {
  await getStarWarPersons();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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
.top-button {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
