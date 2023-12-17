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
          <div>
            <span>
              Height:
              <span class="person-page__info">
                {{ currentPerson?.height }}
                <span v-if="currentPerson?.height !== 'unknown'"> cm </span>
              </span>
            </span>
          </div>
          <div>
            <span>
              Mass:
              <span class="person-page__info"
                >{{ currentPerson?.mass }}
                <span v-if="currentPerson?.mass !== 'unknown'"> kg </span>
              </span></span
            >
          </div>
          <div>
            <span>
              Hair color:
              <span class="person-page__info"
                >{{ currentPerson?.hair_color }}
              </span></span
            >
          </div>
          <div>
            <span>
              Gender:
              <span class="person-page__info"
                >{{ currentPerson?.gender }}
              </span></span
            >
          </div>
          <div>
            <span>
              Birth year:
              <span class="person-page__info"
                >{{ currentPerson?.birth_year }}
              </span></span
            >
          </div>
          <div class="person-page__films">
            <span> Films: </span>
            <ul>
              <li v-for="film in personsFilms" :key="film.title">
                {{ film.title }}({{ film.episode_id }})
              </li>
            </ul>
          </div>
          <div>
            <span>
              Eye color:
              <span class="person-page__info"
                >{{ currentPerson?.eye_color }}
              </span></span
            >
          </div>
          <div>
            <span>
              Skin color:
              <span class="person-page__info"
                >{{ currentPerson?.skin_color }}
              </span></span
            >
          </div>
          <div>
            <span>
              Created:
              <span class="person-page__info"
                >{{ toLocalDate(currentPerson.created) }}
              </span></span
            >
          </div>
          <div class="py-6">
            <span>
              Edited:
              <span class="person-page__info"
                >{{ toLocalDate(currentPerson.edited) }}
              </span></span
            >
          </div>
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
import { fetchPerson, getFilmById } from "@/api";
import { Person, Film } from "@/types";

import { useRoute } from "vue-router";
const route = useRoute();

import { useStore } from "vuex";
const store = useStore();

const currentPerson = ref<Person>();
const personsFilms = ref<Array<Film>>([]);
const isLoading = ref<boolean>(false);

const isFavourite = computed(() => {
  return store.getters.isPersonInFavourites(currentPerson.value);
});

const toLocalDate = (date: string | undefined): string => {
  if (!date) {
    return "unknown";
  }
  return new Date(date).toLocaleDateString();
};

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
    personsFilms.value = await getPersonsFilms(currentPerson.value.films);
  } catch (error) {
    fetchingError.value = error as string;
    console.error(error);
  }
  isLoading.value = false;
};

const getPersonsFilms = async (urls: Array<string>): Promise<Array<Film>> => {
  const films = await Promise.all(
    urls.map(async (url) => await getFilmById(url))
  );
  return films;
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

  &__info {
    @apply max-w-md space-y-1 text-gray-500 dark:text-gray-400;
  }

  &__films {
    ul {
      @apply ml-3 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400;
    }
  }
}
</style>
