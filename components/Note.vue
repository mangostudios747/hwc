<template>
  <div>
    <input v-if="result" class="listboxinput" v-model="noteTitle" />
    <div class="pl-4">
        <Note :noteID="note._id" :key="note._id" v-for="note in result?.noteByID.subNotes" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["noteID"]);
const updateKey = ref(String(Math.random()));

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
const NOTE_SUBSCRIPTION = gql`
  subscription ($noteID: ID!) {
    noteEdited(noteID: $noteID) {
      note {
        _id
        title
      }
      updateKey
    }
  }
`;

const NOTE_MUTATION = gql`
  mutation ($noteID: ID!, $options: NoteOptions!, $updateKey: ID!) {
    updateNote(id: $noteID, options: $options, updateKey: $updateKey) {
      _id
    }
  }
`;

const { result, loading, subscribeToMore } = useQuery(NOTE_QUERY, {
  noteID: props.noteID,
});

subscribeToMore({
  document: NOTE_SUBSCRIPTION,
  variables: { noteID: props.noteID },
  updateQuery(prev, { subscriptionData }) {
    if (subscriptionData.data.noteEdited.updateKey==updateKey.value) return;
    return {
      ...prev,
      ...subscriptionData.data.noteEdited.note,
    };
  },
});

const noteTitle = computed({
  get() {
    return result.value?.noteByID.title;
  },
  set(val) {
    updateKey.value = String(Math.random());
    const { mutate } = useMutation(NOTE_MUTATION, {
      variables: {
        noteID: props.noteID,
        options: {
          title: val,
        },
        updateKey: updateKey.value,
      },
    });
    mutate().then(console.log("did"));
  },
});
</script>

<style>
</style>