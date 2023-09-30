<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle">
      <div class="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span class="badge badge-sm indicator-item">
          {{ cartStore.bookPurchases.length }}
        </span>
      </div>
    </label>
    <div tabindex="0" class="mt-3 card card-compact dropdown-content w-[700px] bg-base-100 shadow">
      <div class="card-body">
        <span class="font-bold text-lg">Книг: {{ cartStore.bookPurchases.length }}</span>
        <span class="text-info">Итого: {{ cartStore.totalPrice.toFixed(2) }}</span>
        <div class="card-actions">
          <button class="btn btn-primary btn-block" @click="() => (isBuyVisible = true)">
            Завершить
          </button>
          <Teleport to="body">
            <dialog id="my_modal_3" class="modal" :class="isBuyVisible && 'modal-open'">
              <div class="modal-box">
                <form method="dialog">
                  <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    @click="isBuyVisible = false"
                  >
                    ✕
                  </button>
                </form>
                <h3 class="font-bold text-lg">Завершение покупки</h3>
                <label class="label">
                  <span class="label-text">Введите номер карты</span>
                </label>
                <input type="text" placeholder="Номер карты" class="input input-bordered w-full" />
                <button class="btn btn-block btn-success mt-4">Оплатить</button>
              </div>
            </dialog>
          </Teleport>
        </div>
        <div class="overflow-auto max-h-96">
          <div
            class="card bg-base-200 m-4 card-side"
            v-for="bookPurchase in cartStore.bookPurchases"
            :key="bookPurchase.book.id"
          >
            <figure class="w-1/3">
              <img :src="bookPurchase.book.cover" class="object-contain" />
            </figure>

            <div class="card-body" v-if="bookPurchase.book">
              <h1>{{ bookPurchase.book.bookName }}</h1>
              <h1>{{ bookPurchase.book.author.name }}</h1>
              <h1>{{ bookPurchase.book.publisher.name }}</h1>
              <h1>{{ bookPurchase.book.publishYear }}</h1>
              <select class="select w-full max-w-xs">
                <option disabled selected>Вид покупки</option>
                <option :selected="bookPurchase.purchaseType == 'BUY'">
                  Покупка: {{ bookPurchase.book.buyPrice }}
                </option>
                <option :selected="bookPurchase.purchaseType == 'RENT_2_MONTH'">
                  Аренда на 2 месяца:
                  {{ (bookPurchase.book.buyPrice / 1.5).toFixed(2) }}
                </option>
                <option :selected="bookPurchase.purchaseType == 'RENT_MONTH'">
                  Аренда на месяц:
                  {{ (bookPurchase.book.buyPrice / 2).toFixed(2) }}
                </option>
                <option :selected="bookPurchase.purchaseType == 'RENT_2_WEEKS'">
                  Аренда на 2 недели:
                  {{ (bookPurchase.book.buyPrice / 4).toFixed(2) }}
                </option>
              </select>
            </div>
            <div class="card-actions">
              <mdicon
                name="delete-sweep"
                width="20"
                height="20"
                class="p-2 btn"
                @click="cartStore.removeFromCart(bookPurchase.book.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const isBuyVisible = ref(false)
const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchCart()
})
</script>