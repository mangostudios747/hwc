<template>
  <div class="text-white/50 text-md mb-4">
    <nuxt-link class="breadcrumb-link" to="/app">Spaces</nuxt-link> /
    <nuxt-link class="breadcrumb-link" :to="`/app/${space._id}`">{{
      space.title
    }}</nuxt-link>
    <span :key="note._id" v-for="note in notes">
        / <nuxt-link class="breadcrumb-link" :to="`/app/${space._id}/${note.url}`">{{
      note.title
    }}</nuxt-link>
    </span>
  </div>
</template>

<script setup>
const props = defineProps(["space", "notes"]);
</script>

<style>
</style>