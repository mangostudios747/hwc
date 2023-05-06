<template>
  <div class="flex flex-col w-full h-screen text-white bg-black">
    <nav class="flex flex-row p-4">
      <h1 class="mr-auto font-extrabold text-lg"><a href="/">homework central<span class="text-amber-500 text-2xl">.</span></a></h1>
      <span v-if="data.me">{{ data.me?.username }}</span>
      <div class="inline-flex gap-4 px-2" v-else>
        <a class="btn-link" href="/login">login</a>
        <a class="btn-link" href="/register">register</a>
      </div>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
const query = gql`
  query getMe {
    me {
      username
    }
  }
`;
const data = useQuery(query, {}).result;
</script>

<style>

</style>