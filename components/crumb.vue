<template>
  <nuxt-link class="breadcrumb-link" to="`/app/${space._id}/${note.url}`">{{
      "note.title"
    }}</nuxt-link>
</template>

<script setup>
const props = defineProps(["note_id"])
const NOTE_QUERY = gql`
  query ($noteID: ID!) {
    noteByID(id: $noteID) {
      title
    }
  }
`;

const { result, loading, subscribeToMore } = useQuery(NOTE_QUERY, {
  noteID: props.note_id,
});
</script>

<style>

</style>