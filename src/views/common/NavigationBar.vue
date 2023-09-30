<script setup lang="ts">
import { useAuthStore } from '@/stores/counter'
import { computed, ref, watch } from 'vue'
import { wordPlayFetch } from '@/fetch/wordPlayFetch'
import type { BookDto } from '@/types/Book'
import CartButton from '@/views/common/CartButton.vue'

const authStore = useAuthStore()
const searchText = ref('')
const baseSearch = computed(() => 'books/search?text=' + searchText.value)

const { data, isFinished } = wordPlayFetch(baseSearch, { refetch: true }).get().json<BookDto[]>()

watch(data, (value) => console.log(value))
</script>

<template>
  <div
    class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm"
  >
    <div class="navbar bg-base-100">
      <div class="flex-1 p-2">
        <div class="dropdown">
          <input
            type="text"
            placeholder="Поиск"
            class="input input-bordered w-24 md:w-auto"
            v-model="searchText"
          />
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li v-for="{ bookName, id } in data" :key="id">
              <a>{{ bookName }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-none gap-2">
        <CartButton v-if="$route.name !== 'admin'" />
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="authStore.avatar" />
            </div>
          </label>

          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li><a>Настройки</a></li>
            <li><a @click="authStore.logout()">Выйти</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>