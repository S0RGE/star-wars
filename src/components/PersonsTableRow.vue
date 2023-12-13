<template>
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
      class="btn btn-success btn-sm btn-outline"
      @click.stop="addPersonToFavourites(person)"
    >
      Add
    </button>
    <button
      v-else
      class="btn btn-error btn-sm btn-outline"
      @click.stop="deletePersonFromFavourites(person)"
    >
      Remove
    </button>
  </th>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { getPersonId } from "@/helpers/parsing";
import type { Person } from "@/types";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps<{
  person: Person;
}>();

const isFavourite = computed(() => {
  return store.getters.isPersonInFavourites(props.person);
});

const deletePersonFromFavourites = (person: Person) => {
  store.dispatch("deletePersonFromFavourites", person);
};

const addPersonToFavourites = (person: Person) => {
  if (store.getters.isPersonInFavourites(person)) {
    return;
  }
  store.dispatch("addPersonToFavourites", person);
};
</script>

<style scoped></style>
