<template>
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
    <Popover class="relative flex">
      <PopoverButton
        class="mx-2 flex my-auto group-focus-within:opacity-100 group-hover:opacity-100 opacity-0 outline-none"
      >
        <icon
          class="my-auto text-black/50 dark:text-white/50"
          size="1.25rem"
          name="heroicons:ellipsis-horizontal-circle"
        />
      </PopoverButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          :focus="true"
          class="absolute w-52 left-1/2 flex z-10 mt-6 top-4 -translate-x-1/2 transform px-4"
        >
          <div
            class="overflow-hidden w-full bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-lg shadow-lg ring-1 ring-black/10 dark:ring-white/20"
          >
            <div class="p-2">
              <a
                :href="`${$route.fullPath}/${note?._id}`"
                class="flex flex-row px-4 py-3 dark:hover:bg-white/10 hover:bg-black/5 rounded-lg outline-none w-full"
              >
                <span class="my-auto">Add Content </span>
                <icon
                  class="my-auto ml-auto"
                  size="1.25rem"
                  name="heroicons:arrow-right-circle"
                />
              </a>
              <button
                class="flex w-full flex-row px-4 py-3 hover:bg-red-400/10 rounded-lg outline-none text-red-400"
              >
                <span class="my-auto">Delete </span>
                <icon
                  class="my-auto ml-auto"
                  size="1.25rem"
                  name="heroicons:trash"
                />
              </button>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup>
const props = defineProps(["noteID"]);
const updateKey = ref(String(Math.random()));
const isFocused = ref(false);

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
    mutate().then(console.log("did"));
  },
});
</script>

<style>
</style>