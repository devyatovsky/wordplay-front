<script setup lang="ts">
import BookInCart from '@/components/books/BookInCart.vue'
import { wordPlayFetch } from '@/fetch/wordPlayFetch'

const { data, isFinished } = wordPlayFetch('cart').get().json()
</script>

<template>
  <div class="grid grid-cols-3 gap-4 scroll-auto" v-if="isFinished">
    <BookInCart
      v-for="book in data.books"
      v-bind:key="book.id"
      :bookName="book.bookName"
      :author="book.author"
      :description="book.description"
      :publishYear="book.publishYear"
      :cover="book.cover"
      :id="book.id"
      :publisher="book.publisher"
      :buy-price="book.buyPrice"
    />
  </div>
</template>