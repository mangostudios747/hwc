<template>
  <div class="mt-8 mx-16">
    <div v-if="!space">loading...</div>
    <div v-else>
    <h1 class="text-4xl !font-semibold">{{ space.title }}</h1>
    <div class="mt-8">
      <Note :noteID="note._id" :key="note._id" v-for="note in space.rootNotes"/>
    </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const query = gql`
  query ($id: ID!) {
    spaceByID(id: $id) {
      title
      rootNotes {
        title
        _id
      }
    }
  }
`;

const {
  result, loading
} = useQuery(query, { id: route.params.space });
const space = ref(result.value?.spaceByID)

</script>

<style>
</style>