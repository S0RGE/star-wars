<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
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
          <persons-table-row :person="person" />
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
import { defineProps } from "vue";
import type { Person } from "@/types";

import PersonsTableRow from "./PersonsTableRow.vue";

defineProps<{
  starWarsPersons: Array<Person>;
}>();
</script>

<style scoped>
button {
  margin: 0 0.3em 0 0.3em;
}
</style>
