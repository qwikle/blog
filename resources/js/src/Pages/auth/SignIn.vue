<template>
  <Base>
    <section
      class="w-5/6 mx-auto shadow-sm rounded-md max-h-96 flex justify-center py-8 my-24 bg-white"
    >
      <form @submit.prevent="signIn()" class="flex items-center flex-col gap-y-6 w-3/4">
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
        <button
          class="bg-amber-500 text-gray-50 w-full h-10 rounded hover:bg-amber-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        >
          Connexion
        </button>
      </form>
    </section>
  </Base>
</template>
<script setup>
import Base from '@/Layouts/Base.vue'
import Input from '@/Components/Input.vue'
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
const forms = ref([
  {
    label: 'Email',
    type: 'email',
    id: 'email',
    model: '',
    isPassword: false,
    error: null,
  },
  {
    label: 'Mot de passe',
    type: 'password',
    id: 'password',
    model: '',
    isPassword: true,
    error: null,
  },
])
const rememberMe = ref(false)
function signIn() {
  const user = useForm({
    email: forms.value[0].model,
    password: forms.value[1].model,
    remember: rememberMe.value,
  })
  user.post('sign-in', {
    preserveState: true,
    onSuccess: () => {
      user.reset()
    },
    onError: (errors) => {
      forms.value.forEach((form) => {
        form.error = null
      })
      Object.keys(errors).forEach((key) => {
        forms.value.forEach((form) => {
          if (form.id === key) {
            form.error = errors[key][0]
          }
        })
      })
    },
  })
}
</script>
<style scoped></style>
