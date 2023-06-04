<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: function(to, from) {
    const user = useState("me");

    if (!user.value) {
      return navigateTo('/login');
    }
  },
});
</script>

<style>
</style>