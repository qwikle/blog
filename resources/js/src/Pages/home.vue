<template>
  <Base>
    <Curve class="absolute -z-10 fill-emerald-500 left-0 top-16" />
    <div class="mx-auto md:pt-8">
      <h1
        class="flex justify-center text-4xl items-center uppercase font-inter font-extrabold text-gray-600"
      >
        sparta<Logo class="w-10 h-10 fill-amber-500" />us
      </h1>
      <p class="text-center text-white font-inter font-medium text-sm md:text-base italic">
        Le blog des intrus de la tech ! Tu cherches un truc ? tu ne trouveras rien ici !
      </p>
    </div>
  </Base>
</template>
<script setup>
import Base from '@/Layouts/Base.vue'
import Logo from '@/Components/Logo.vue'
import Curve from '@/Components/Curve.vue'
</script>
<style scoped></style>
