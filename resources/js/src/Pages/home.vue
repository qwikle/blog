<template>
  <Base> </Base>
</template>
<script setup>
import Base from '@/Layouts/Base.vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()
const user = page.props.user
</script>
<style scoped></style>
