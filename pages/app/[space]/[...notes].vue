<template>
  <div>
  <div v-if="!note">loading</div>
  <div v-else>
    <!--<breadcrumb class="px-8" />-->
    <Note v-slot="{ bind, on }" :noteID="note._id">
      <input
        v-on="on"
        v-bind="bind"
        class="text-4xl !font-semibold px-8 listboxinput !text-white"
      />
    </Note>
    <div class="mt-6">
      <div class="h-full w-full flex flex-col gap-1">
        <Note
          :noteID="subNote._id"
          :key="subNote._id"
          v-for="subNote in note.subNotes"
        />
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
const props = defineProps(["space"]);
const route = useRoute();
const note_id = [...route.params.notes].pop();
console.log(note_id);
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

const note = computed(() => {
  return result.value?.noteByID;
});
</script>

<style>
</style>