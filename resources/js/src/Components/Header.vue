<template>
  <header
    v-if="isMobile && !isOpen"
    class="h-16 w-full items-center justify-between px-4 flex bg-white shadow-sm relative"
  >
    <Link href="/" class="w-10 h-10 flex justify-center items-center rounded-full">
      <Logo class="h-8 w-8 fill-amber-500" />
    </Link>
    <button @click="openDrawer" class="w-10 h-10 flex justify-center items-center rounded-full">
      <Bars3BottomRightIcon class="h-8 w-8 text-gray-500" />
    </button>
  </header>
  <Transition name="translate">
    <div
      v-if="isOpen && isMobile"
      class="w-2/3 h-screen fixed top-0 left-0 overflow-y-auto bg-white z-40 flex flex-col"
    >
      <header
        class="h-16 w-full items-center justify-between px-4 flex bg-white shadow-sm relative"
      >
        <Link href="/" class="w-10 h-10 flex justify-center items-center rounded-full">
          <Logo class="h-8 w-8 fill-amber-500" />
        </Link>
        <button
          @click="closeDrawer"
          class="w-10 h-10 flex justify-center items-center rounded-full"
        >
          <XMarkIcon class="h-8 w-8 text-gray-500" />
        </button>
      </header>
      <nav class="flex-1 flex flex-col items-center py-4 gap-y-2">
        <Link v-for="link in urls" :href="link.href" class="text-amber-500 text-xl font-bold">{{
          link.title
        }}</Link>
      </nav>
    </div>
  </Transition>
  <Transition>
    <div
      @click="closeDrawer"
      v-if="isOpen && isMobile"
      class="w-full h-screen overflow-y-auto bg-gray-900 opacity-30 z-30 absolute top-0 right-0"
    ></div>
  </Transition>
  <header
    v-if="!isMobile"
    class="h-16 w-full items-center justify-between px-4 flex bg-white shadow-sm relative"
  >
    <Link href="/" class="w-10 h-10 flex justify-center items-center rounded-full">
      <Logo class="h-8 w-8 fill-amber-500" />
    </Link>
    <nav class="flex h-full items-center justify-center gap-x-4">
      <Link
        v-for="link in urls"
        :href="link.href"
        class="p-1 font-medium rounded-md text-amber-500 text-md hover:bg-amber-100 hover:text-amber-400 transform hover:scale-105 transition-all"
      >
        {{ link.title }}</Link
      >
    </nav>
  </header>
</template>
<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import Logo from '@/Components/Logo.vue'
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/vue/24/solid'
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')
const isOpen = ref(true)

function openDrawer() {
  isOpen.value = true
}

function closeDrawer() {
  isOpen.value = false
}

defineProps({
  urls: {
    type: Array,
  },
})
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.translate-enter-active,
.translate-leave-active {
  transition: transform 0.3s;
}

.translate-enter-from,
.translate-leave-to {
  transform: translateX(-100%);
}
</style>
