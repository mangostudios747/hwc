<!-- root notes of the space -->
<template>
  <div>
  <div class="flex flex-row">
    <h1 class="text-4xl !font-semibold px-8 mr-auto">{{ space?.title }}</h1>
    <button class="rounded-sm">
      
    </button>
  </div>
  <hr class="border-white/30 mt-1 mx-4"/>
  <div class="mt-6">
    <div class="h-full w-full flex flex-col gap-1">
      <Note :noteID="note._id" :key="note._id" v-for="note in rootNotes" />
    </div>
  </div>
  </div>
</template>

<script setup>
const props = defineProps(["space", "rootNotes"]);
</script>

<style>
</style>