<template>
  <button
    :disabled="disabled"
    class="bg-amber-500 text-gray-50 w-full h-10 rounded hover:bg-amber-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-alloweddisabled:bg-amber-500 disabled:hover:bg-amber-500 disabled:active:bg-amber-500 disabled:mouse disabled:shadow-none disabled:transition disabled:ease-in disabled:duration-200 disabled:focus:outline-none"
  >
    <slot></slot>
  </button>
</template>
<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
