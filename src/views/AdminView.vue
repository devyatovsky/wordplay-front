<script setup lang="ts">
import type { BookDto } from '@/types/Book'
import { computed, reactive, ref } from 'vue'
import BookForm from '@/components/admin/BookForm.vue'
import { wordPlayFetch } from '@/fetch/wordPlayFetch'

const direction = ref('ASC')
const baseURL = 'http://localhost:8080/api/books?'
const params = reactive({
  page: 0,
  size: 10,
  sort: 'id' + ',' + direction.value
})
const handleCreate = () => {
  editBook.value = {
    author: { name: '' },
    bookName: '',
    buyPrice: 0,
    cover: '',
    description: '',
    id: 0,
    publishYear: '',
    publisher: { name: '' },
    category: ''
  }
  isFormVisible.value = true
}

// @ts-ignore
const params3 = computed(() => baseURL + new URLSearchParams(params))

const { data, isFinished, execute } = wordPlayFetch<BookDto[]>(params3, { refetch: true }).json()
const selectedBooks = ref<string[]>([])
const allSelected = ref(false)
const editBook = ref<BookDto>()
const isFormVisible = ref(false)

const handleDelete = () => {
  const bookIds = selectedBooks.value.map((id) => `bookId=${id}&`).join("")
  console.log(bookIds)
  let deleteURL = `books?${bookIds}`
  wordPlayFetch(deleteURL)
    .delete(selectedBooks)
    .json()
    .then(() => execute())
}

const handleEdit = (book: BookDto) => {
  editBook.value = book
  isFormVisible.value = true
}

const selectAll = () => {
  if (allSelected.value) {
    selectedBooks.value = []
  } else {
    selectedBooks.value = data.value.content.map(({ id }: number) => id)
  }
  allSelected.value = !allSelected.value
}

const visibleChanged = () => {
  editBook.value = undefined
  execute()
}

const handleSort = (field: string) => {
  if (direction.value == 'ASC') {
    direction.value = 'DESC'
  } else {
    direction.value = 'ASC'
  }
  params.sort = `${field},${direction.value}`
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table" v-if="isFinished">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" @click="selectAll" />
            </label>
          </th>
          <th>
            <button @click="handleSort('id')">ID</button>
          </th>
          <th scope="col" @click="handleSort('bookName')">Книга</th>
          <th scope="col" @click="handleSort('publisher.name')">Издатель</th>
          <th scope="col" @click="handleSort('price')">Цена/Аренда</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in data.content" v-bind:key="book.id">
          <th id="check">
            <label>
              <input type="checkbox" class="checkbox" :value="book.id" v-model="selectedBooks" />
            </label>
          </th>
          <td>
            <label>
              {{ book.id }}
            </label>
          </td>
          <td>
            <div class="flex items-center space-x-3">
              <div class="w-24">
                <img :src="book.cover" alt="Avatar Tailwind CSS Component" />
              </div>
              <div>
                <div class="font-bold">{{ book.bookName }}</div>
                <div class="text-sm opacity-50">{{ book.author.name }}</div>
              </div>
            </div>
          </td>
          <td>
            {{ book.publisher.name }}
            <br />
            <span class="badge badge-ghost badge-sm">{{ book.publishYear }}</span>
          </td>
          <td>{{ book.buyPrice }} / {{ book.rentPrice }}</td>
          <th id="edit">
            <button class="btn btn-ghost btn-xs" @click="() => handleEdit(book)">Изменить</button>
          </th>
        </tr>
      </tbody>
      <!-- foot -->
      <tfoot>
        <div class="join">
          <div v-for="index in data.totalPages" :key="index">
            <button
              class="join-item btn"
              :class="data.pageable.pageNumber == index && 'btn-accent'"
            >
              {{ index }}
            </button>
          </div>
        </div>
      </tfoot>
    </table>
    <div class="fixed right-10 bottom-10">
      <div v-if="selectedBooks.length != 0">
        <button @click="handleDelete" class="btn rounded-full btn-sm w-10 btn-error">
          <mdicon name="delete" width="20" height="20" class="absolute" />
        </button>
      </div>
      <button @click="handleCreate" class="btn rounded-full btn-sm w-10">
        <mdicon name="plus" width="20" height="20" class="absolute" />
      </button>
    </div>

    <book-form
      v-if="editBook"
      :book="editBook"
      v-model:isVisible="isFormVisible"
      @update:isVisible="visibleChanged"
    />
  </div>
</template>

<style scoped></style>