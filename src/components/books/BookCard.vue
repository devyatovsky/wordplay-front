<script setup lang="ts">
import type { BookDto } from '@/types/Book'
import BookBuyActions from '@/components/books/BookBuyActions.vue'

const props = defineProps<BookDto>()
</script>

<template>
  <div class="card card-side bg-base-300 shadow-xl">
    <figure class="h-full w-full"><img :src="cover" alt="Cover" class="h-full w-full" /></figure>
    <div class="card-body w-4/5">
      <p>{{ props.bookName }}</p>
      <span>{{ props.author.name }}</span>
      <p class="bottom-0 flex-1">{{ props.publishYear }}</p>
      <p class="bottom-0 flex-1">{{ props.category }}</p>
      <BookBuyActions :book="props" />
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