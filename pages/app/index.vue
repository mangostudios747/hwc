<template>
  <div class="mx-16 mt-8">
    <h2 class="text-4xl !font-semibold btn-link">Spaces</h2>
    <div class="grid grid-cols-6 gap-4 mt-8">
    <a :href="`/app/${space._id}`"
    class="hover:bg-white/10 cursor-pointer block border-2 border-white/10 p-4"
    :key="space._id" v-for="{space} in result?.me?.spaces">
    <span class="font-semibold">{{space.title}}</span>
    </a>
    <a 
    class="hover:bg-white/10 cursor-pointer text-center block border-2 border-white/10 p-4"
    >
    <button @click="openModal()" class="font-semibold h-full w-full"><Icon name="+" /></button>
    </a>
    </div>
     <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full text-white border-box max-w-md transform overflow-hidden  bg-black p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6"
              >
                Create Space
              </DialogTitle>
              <div class="mt-4">
                <input class="inpt" placeholder="Title"/>
              </div>

              <div class="mt-4 text-right">
                <button
                  class="btn-link "
                  @click="closeModal"
                >
                  Create
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </div>
</template>

<script setup>
const query = gql`
query getMe {
  me {
    spaces {
      space {
        _id
        title
        rootNotes {
          title
        }
      }
    }
  }
}`;

const { result } = useQuery(query, {})

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>

<style>

</style>