<template>
  <div class="mt-8 w-full h-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl mx-auto flex flex-col">
    <div v-if="loading">loading...</div>
    <div v-if="!loading">
      
      <Nuxt-Page :space="space" :rootNotes="space?.rootNotes" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const query = gql`
  query ($id: ID!) {
    spaceByID(id: $id) {
      _id
      title
      rootNotes {
        title
        _id
      }
    }
  }
`;

const { result, loading } = useQuery(query, { id: route.params.space });
const space = computed(() => result?.value?.spaceByID);

const note_ids = route.params.notes;

const NOTE_QUERY = gql`
  query ($noteID: ID!) {
    noteByID(id: $noteID) {
      _id
      title
    }
  }
`;

/*const { data, pending, error, refresh } = await useAsyncData(
  async () => {
    if (!note_ids) {
      console.log("bye")
      return [];
    }
    const a = []
    console.log("um", note_ids)
    for (const index in note_ids){
      console.log("hi")
        const note_id = note_ids[index]
        const { data } = await useAsyncQuery(NOTE_QUERY, { noteID: note_id });
        const note = (await data.value).noteByID;
        const chain = note_ids.splice(0, index + 1).join("/");
        note.url = chain;
        a.push(note)
      }
    return a;
  }
);*/
</script>

<style>
</style>