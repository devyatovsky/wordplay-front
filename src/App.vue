<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/views/common/NavigationBar.vue'

</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <main class="drawer-content">
      <NavigationBar v-if="!$route.meta.hideHUD" />
      <RouterView class="p-4" mode="out-in" />
    </main>
    <div class="drawer-side sticky z-40" v-if="!$route.meta.hideHUD">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <a class="btn btn-ghost normal-case text-xl" href="/">Wordplay</a>
        <li><a>Мой профиль</a></li>
        <li><a>Арендовано</a></li>
        <li><a>Куплено</a></li>
      </ul>
    </div>
  </div>
</template>