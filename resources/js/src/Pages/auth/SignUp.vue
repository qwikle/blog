<template>
  <Base>
    <section
      class="w-5/6 max-w-lg mx-auto shadow-sm rounded-md flex justify-center px-6 py-8 my-16 bg-white relative"
    >
      <h1 class="absolute -top-16 text-4xl font-extrabold text-amber-500">Inscription</h1>
      <form @submit.prevent="signup" class="flex items-center flex-col gap-y-6 w-full">
        <FadeTransition>
          <Alert v-if="$page.props.error || $page.props.success" />
        </FadeTransition>
        <Input
          v-for="input in forms"
          :form="input"
          v-model="input.model"
          :isPassword="input.isPassword"
          :error="input.error"
        />
        <Button :disabled="isDisabled" class="w-full"> {{ buttonMessage }} </Button>
      </form>
    </section>
  </Base>
</template>
<script setup>
import Base from '@/Layouts/Base.vue'
import Input from '@/Components/Input.vue'
import Button from '@/Components/Button.vue'
import FadeTransition from '@/Components/transitions/FadeTransition.vue'
import Alert from '@/Components/Alert.vue'
import { camelCase } from 'lodash'
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'

const forms = ref({
  username: {
    label: "Nom d'utilisateur",
    type: 'text',
    id: 'username',
    model: '',
    isPassword: false,
    error: null,
  },
  email: {
    label: 'Email',
    type: 'email',
    id: 'email',
    model: '',
    isPassword: false,
    error: null,
  },
  password: {
    label: 'Mot de passe',
    type: 'password',
    id: 'password',
    model: '',
    isPassword: true,
    error: null,
  },
  passwordConfirmation: {
    label: 'Confirmation du mot de passe',
    type: 'password',
    id: 'passwordConfirmation',
    model: '',
    isPassword: true,
    error: null,
  },
})

const buttonMessage = ref("S'inscrire")

function resetForms() {
  forms.value.username.model = ''
  forms.value.email.model = ''
  forms.value.password.model = ''
  forms.value.passwordConfirmation.model = ''
}

const isDisabled = computed(() => {
  return Object.values(forms.value).some((form) => form.model === '')
})

function signup() {
  const user = useForm({
    username: forms.value.username.model,
    email: forms.value.email.model,
    password: forms.value.password.model,
    password_confirmation: forms.value.passwordConfirmation.model,
  })
  user.post('sign-up', {
    preserveState: true,
    onSuccess: () => {
      resetForms()
    },
    onError: (errors) => {
      Object.keys(errors).forEach((key) => {
        const camelCaseKey = camelCase(key)
        forms.value[camelCaseKey].error = errors[key][0]
      })
    },
  })
}
</script>
<style scoped></style>
