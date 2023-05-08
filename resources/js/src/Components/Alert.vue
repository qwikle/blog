<template>
  <div
    :class="{
      'bg-green-100 border-green-500 text-green-700': type === 'success',
      'bg-red-100 border-red-500 text-red-700': type === 'error',
    }"
    class="rounded-lg border p-4"
  >
    <p>{{ message }}</p>
  </div>
</template>
<script setup>
import FadeTransition from '@/Components/transitions/FadeTransition.vue'
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()

const message = computed(() => page.props.error || page.props.success)

const type = computed(() => {
  if (page.props.error) {
    return 'error'
  }

  if (page.props.success) {
    return 'success'
  }
})
</script>
<style scoped></style>
