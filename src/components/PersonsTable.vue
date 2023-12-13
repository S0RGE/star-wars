<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair_color</th>
          <th>Add Favourite/ Remove Favourite</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in starWarsPersons" :key="person.name">
          <td>
            <div class="flex items-center gap-3">
              <router-link
                :to="{
                  name: 'character',
                  params: { id: getPersonId(person.url) },
                }"
                >{{ person.name }}</router-link
              >
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              {{ person.height }}
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              {{ person.mass }}
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              {{ person.hair_color }}
            </div>
          </td>
          <th>
            <button
              v-if="!isFavourite"
              class="btn btn-success btn-xs mr-2"
              @click.stop="addPersonToFavourites(person)"
            >
              Add
            </button>
            <button
              class="btn btn-error btn-xs"
              @click.stop="deletePersonFromFavourites(person)"
            >
              Remove
            </button>
          </th>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair_color</th>
          <th>Add Favourite/ Remove Favourite</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useRoute } from "vue-router";
import type { Person } from "@/types";

import { getPersonId } from "@/helpers/parsing";

defineProps<{
  starWarsPersons: Array<Person>;
}>();

import { useStore } from "vuex";
const store = useStore();

const route = useRoute();
const isFavourite = computed(() => {
  return route.name === "favourites";
});

const deletePersonFromFavourites = (person: Person) => {
  store.dispatch("deletePersonFromFavourites", person);
};

const addPersonToFavourites = (person: Person) => {
  store.dispatch("addPersonToFavourites", person);
};
</script>

<style scoped></style>
