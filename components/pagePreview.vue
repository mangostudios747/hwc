<template>
      <div  class="my-auto ml-2 rounded border border-black/30 dark:border-white/30 bg-black/10 dark:bg-white/20 h-10 w-8 flex flex-col gap-1 px-1 py-2">
        <preview-bar :key="n" v-for="n in bars" />
      </div>
</template>

<script setup>

const props = defineProps(["bars"])
</script>

<style>

</style>