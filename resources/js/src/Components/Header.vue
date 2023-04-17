<template>
  <div class="navbar bg-secondary shadow-md">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">SPARTAKUS</a>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input type="text" placeholder="Rechercher" class="input input-bordered" />
      </div>
      <ProfileComponent />
    </div>
  </div>
</template>
<script setup>
import ProfileComponent from '@/Components/Profile.vue'
</script>
