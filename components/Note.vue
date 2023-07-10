<template>
<slot :bind="{ value: noteTitle }" :on="{ input: setNoteTitle }" >
  <div
    class="flex group flex-row gap-1 py-1 rounded"
    :class="isFocused? '': 'focus-within:bg-black/5 focus-within:dark:bg-white/10'"
  >
  <button @click.prevent>
    <icon
      size="20px"
      class="cursor-grab opacity-0 group-hover:opacity-100 group-focus-within:opacity-100  my-auto ml-1 text-white/50 hover:text-white/80"
      name="ph:dots-six-vertical-bold"
    />
  </button>
    <a class="flex" :href="`${$route.fullPath}/${note?._id}`"
      ><page-preview :bars="note?.subNotes.length" v-if="note?.subNotes.length"
    /></a>
    <div class="flex flex-col px-2 w-full">
      <input
        @keydown="keydownHandler"
        @focusin="setIsFocused"
        @focusout="setIsFocused"
        @click.prevent
        v-if="result"
        :class="[note?.subNotes.length ? 'font-semibold' : '']"
        class="listboxinput w-full"
        v-model="noteTitle"
      />
      <span
        class="dark:text-white/50 text-black/50"
        v-if="note?.subNotes.length"
        >{{ note.subNotes.map((e) => e.title).join(" • ") }}</span
      >
    </div>
    <note-popover :note="note">
      <icon
          class="my-auto text-black/50 dark:text-white/50"
          size="1.25rem"
          name="heroicons:ellipsis-horizontal-circle"
        />
    </note-popover>
  </div>
</slot>
</template>

<script setup>
const props = defineProps(["noteID",]);
const updateKey = ref(String(Math.random()));
const isFocused = ref(false);

function keydownHandler(e){
  if (e.key == 'Enter'){
    // create a new note :flushed:
    console.log("😳")
  }
}

function setIsFocused(e){
  if (e.type=="focusin"){
    isFocused.value = true;
  }
  else if (e.type=="focusout"){
    isFocused.value = false
  }
}

const NOTE_QUERY = gql`
  query ($noteID: ID!) {
    noteByID(id: $noteID) {
      _id
      title
      subNotes {
        title
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
    if (subscriptionData.data.noteEdited.updateKey == updateKey.value) return;
    return {
      ...prev,
      ...subscriptionData.data.noteEdited.note,
    };
  },
});

const note = computed(() => {
  return result.value?.noteByID;
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
    mutate()
  },
});

function setNoteTitle(e){
  noteTitle.value = e.target.value;
}
</script>

<style>
</style>