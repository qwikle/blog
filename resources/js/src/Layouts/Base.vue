<template>
  <Header :urls="urls" />
  <FadeTransition>
    <main :key="$page.url" class="container w-full h-full pt-4 mx-auto">
      <slot></slot>
    </main>
  </FadeTransition>
  <footer></footer>
</template>
<script setup>
import Header from '@/Components/Header.vue'
import FadeTransition from '@/Components/transitions/FadeTransition.vue'
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()
const user = computed(() => page.props.user)
const urls = computed(() => {
  if (user.value) {
    return [
      { title: 'Mon compte', href: '/account' },
      { title: 'Déconnexion', href: '/sign-out' },
    ]
  }

  return [
    { title: 'Connexion', href: '/sign-in' },
    { title: "S'inscrire", href: '/sign-up' },
  ]
})
</script>
<style scoped></style>
