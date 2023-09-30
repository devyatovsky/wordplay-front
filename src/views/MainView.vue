<script setup lang="ts">
import BookCard from '@/components/books/BookCard.vue'
import type { BookDto } from '@/types/Book'
import { wordPlayFetch } from '@/fetch/wordPlayFetch'
import { computed, reactive } from 'vue'

const base = 'books?size=50'
const sort = reactive<{orderBy: string, direction: 'ASC' | 'DESC'}>({
  orderBy: 'id',
  direction: 'ASC'
})
const params = computed(() => {
  return `${base}&sort=${sort.orderBy},${sort.direction}`
})

const { data, isFinished } = wordPlayFetch<BookDto[]>(params, {refetch: true}).get().json()

const handleSort = (orderBy: string) => {
  sort.orderBy = orderBy
  if (sort.direction == 'ASC') {
    sort.direction = 'DESC'
  } else {
    sort.direction = "ASC"
  }
}
</script>

<template>
  <div>
    <div class="pb-4">
      Сортировка по:
      <span class="badge" @click="handleSort('category')">Категория</span>
      <span class="badge" @click="handleSort('author.name')">Автор</span>
      <span class="badge" @click="handleSort('publishYear')">Год написания</span>
    </div>
    <div class="grid grid-cols-3 gap-4 scroll-auto" v-if="isFinished">
      <BookCard
        v-for="book in data.content"
        v-bind:key="book.id"
        :bookName="book.bookName"
        :author="book.author"
        :description="book.description"
        :publishYear="book.publishYear"
        :cover="book.cover"
        :id="book.id"
        :publisher="book.publisher"
        :buy-price="book.buyPrice"
        :category="book.category"
      />
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<style scoped></style>