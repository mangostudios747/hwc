<template>
  <div>
    {{data.me?.username}}
    <NuxtPage/>
  </div>
</template>

<script setup>
 const query = gql`
  query getMe {
    me {
      username
    }
  }
`
const data = useQuery(query, {}).result
</script>

<style>

</style>