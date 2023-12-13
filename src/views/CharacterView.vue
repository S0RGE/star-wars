<template>
  <div>
    <h2>Person page</h2>
    <pre>
      {{ currentPerson }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { fetchPerson } from "@/api";
import { Person } from "@/types";

const currentPerson = ref<Person>();

onMounted(async () => {
  const id = useRoute().params.id as string;
  currentPerson.value = await fetchPerson(id);
});
</script>

<style scoped></style>
