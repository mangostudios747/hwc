<template>
  <div class="flex h-full w-full">
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: async function (to, from) {
    //const user = useState("me");
    if (process.server) {
      const user = useState("me");
      if (!user.value) {
        return navigateTo("/login");
      }
    }
    else {
    const { getToken } = useApollo();
    const token = await getToken();
    if (!token) {
      return navigateTo("/login");
    }
    }
  },
});
</script>

<style>
</style>