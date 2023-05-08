<template>
  <Base>
    <section
      class="w-5/6 max-w-lg mx-auto shadow-sm rounded-md flex justify-center py-8 my-20 bg-white relative"
    >
      <h1 class="absolute -top-16 text-4xl font-extrabold text-amber-500">Connexion</h1>
      <form @submit.prevent="signIn" class="flex items-center flex-col gap-y-6 w-3/4">
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
        <div class="w-full flex justify-between text-xs md:text-sm lg:text-base">
          <div class="flex items-center gap-x-2">
            <input v-model="rememberMe" type="checkbox" id="remember" />
            <label class="text-gray-500 font-medium" for="remember">Se souvenir de moi</label>
          </div>
          <a href="#" class="text-amber-500 hover:text-amber-600">Mot de passe oublié ?</a>
        </div>
        <Button :disabled="isDisabled" class="w-full"> Se connecter </Button>
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
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
const forms = ref({
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
})

const isDisabled = computed(() => {
  return Object.values(forms.value).some((form) => form.model === '')
})

const rememberMe = ref(false)
function signIn() {
  const user = useForm({
    email: forms.value.email.model,
    password: forms.value.password.model,
    rememberMe: rememberMe.value,
  })
  user.post('sign-in', {
    preserveState: true,
    onSuccess: () => {
      user.reset()
    },
    onError: (errors) => {
      if (errors.auth) {
        console.log(errors.auth)
      } else {
        Object.keys(errors).forEach((key) => {
          forms.value[key].error = errors[key][0]
        })
      }
    },
  })
}
</script>
<style scoped></style>
