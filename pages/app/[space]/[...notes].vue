<template>
<div v-if="!note"></div>
<div v-else>
  <h1 class="text-4xl !font-semibold px-2">{{ note.title }}</h1>
  <div class="mt-6">
    <div class="h-full w-full flex flex-col gap-1">
      <Note :noteID="subNote._id" :key="subNote._id" v-for="subNote in note.subNotes" />
    </div>
  </div>
</div>
</template>

<script setup>
const props = defineProps(["space"])
const route = useRoute();
const note_id = [...route.params.notes].pop()

const NOTE_QUERY = gql`
  query ($noteID: ID!) {
    noteByID(id: $noteID) {
      _id
      title
      subNotes {
        _id
      }
    }
  }
`;

const { result, loading, subscribeToMore } = useQuery(NOTE_QUERY, {
  noteID: note_id,
});

const note = computed(()=>{
    return result.value?.noteByID
})
</script>

<style>

</style>