<script setup lang="ts">
import type { BookDto } from '@/types/Book'

const props = defineProps<BookDto>()
</script>

<template>
  <div class="card card-side bg-base-300 shadow-xl">
    <figure class="h-full w-full"><img :src="cover" alt="Cover" class="h-full w-full" /></figure>
    <div class="card-body w-4/5">
      <p>{{ props.bookName }}</p>
      <span>{{ props.author.name }}</span>
      <p class="bottom-0 flex-1">{{ props.publishYear }}</p>
      <select class="select w-full max-w-xs">
        <option disabled selected>Вид покупки</option>
        <option>Покупка: {{buyPrice}}</option>
        <option>Аренда на 2 месяца: {{ (buyPrice/1.5).toFixed(2) }}</option>
        <option>Аренда на месяц: {{ (buyPrice/2).toFixed(2) }}</option>
        <option>Аренда на 2 недели: {{ (buyPrice/4).toFixed(2) }}</option>
      </select>
    </div>
    <div class="dropdown dropdown-end absolute right-0 p-2">
      <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-4 h-4 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </label>
      <div
        tabindex="0"
        class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
      >
        <div class="card-body">
          <p>{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>