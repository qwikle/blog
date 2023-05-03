<template>
  <div class="w-full">
    <div class="flex flex-col gap-y-2 relative">
      <label class="text-gray-500 font-medium" :for="form.id">{{ form.label }}</label>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="reactiveType"
        class="rounded-lg"
        :id="form.id"
        :class="{
          'border-red-500': error,
        }"
      />
      <template v-if="isPassword">
        <EyeIcon
          v-if="reactiveType === 'password'"
          class="h-6 w-6 absolute right-4 bottom-2 text-gray-500"
          @click="togglePassword()"
        />
        <EyeSlashIcon
          v-else
          class="h-6 w-6 absolute right-4 bottom-2 text-gray-500"
          @click="togglePassword()"
        />
      </template>
    </div>
    <Transition name="fade" mode="in-out" appear>
      <p v-if="error" class="text-xs text-red-500 mt-2">{{ error }}</p>
    </Transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
defineEmits(['update:modelValue', 'togglePassword'])
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String,
  },
  isPassword: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
  },
})

const reactiveType = ref(props.form.type)
function togglePassword() {
  reactiveType.value = reactiveType.value === 'password' ? 'text' : props.form.type
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
