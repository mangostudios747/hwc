<!-- root notes of the space -->
<template>
  <h1 class="text-4xl !font-semibold px-8">{{ space?.title }}</h1>
  <div class="mt-6">
    <div class="h-full w-full flex flex-col gap-1">
      <Note :noteID="note._id" :key="note._id" v-for="note in rootNotes" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["space", "rootNotes"]);
</script>

<style>
</style>