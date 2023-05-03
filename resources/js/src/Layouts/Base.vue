<template>
  <Header :urls="urls" />
  <Transition name="fade" mode="out-in" appear>
    <main :key="$page.url" class="container w-full h-full pt-4 mx-auto">
      <slot></slot>
    </main>
  </Transition>
  <footer></footer>
</template>
<script setup>
import Header from '@/Components/Header.vue'
const urls = [
  { href: '/sign-in', title: 'Connexion' },
  { href: '/sign-up', title: 'Inscription' },
]
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
