<template>
  <Popover class="relative flex">
      <PopoverButton
        class="mx-2 flex my-auto group-focus-within:opacity-100 group-hover:opacity-100 opacity-0 outline-none"
      >
      <slot/>
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
</template>

<script setup>
defineProps(["note"])
</script>

<style>

</style>