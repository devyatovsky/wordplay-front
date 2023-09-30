<template>
  <div class="card-actions justify-end">
    <div class="join join-horizontal">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-primary btn-sm join-item">Купить</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a @click="handleClick(book.id, 'BUY')">Цена: {{ book.buyPrice }}₽</a>
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <label tabindex="0" class="btn btn-secondary btn-sm join-item">Арендовать</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a @click="handleClick(book.id, 'RENT_2_WEEKS')"
              >2 недели за {{ book.buyPrice / 4 }}₽</a
            >
          </li>
          <li>
            <a @click="handleClick(book.id, 'RENT_MONTH')">Месяц {{ book.buyPrice / 2 }}₽</a>
          </li>
          <li>
            <a @click="handleClick(book.id, 'RENT_MONTH')"
              >2 месяца {{ (book.buyPrice / 1.5).toFixed(2) }}₽</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { BookDto, BookPurchaseDto } from "@/types/Book";
import { wordPlayFetch } from '@/fetch/wordPlayFetch'

defineProps<{ book: BookDto }>()

const cartStore = useCartStore()

const handleClick = (
  bookId: number,
  purchaseType: 'BUY' | 'RENT_2_WEEKS' | 'RENT_MONTH' | 'RENT_2_MONTH'
) => {
  const { data, onFetchResponse } = wordPlayFetch('cart/book')
    .post({ bookId, purchaseType })
    .json<{ books: BookPurchaseDto[]; totalPrice: number; id: number }>()
  onFetchResponse(() => {
    console.log(data.value);
    cartStore.addToCart(data.value.books, data.value.totalPrice)
  })
}

// const bookAdd = wordPlayFetch('cart/book').post({bookId, purchaseType})
//   .json<{ books: BookDto[]; totalPrice: number, id: number }>()
</script>