import { defineStore } from 'pinia'
import { wordPlayFetch } from '@/fetch/wordPlayFetch'
import type { BookPurchaseDto } from '@/types/Book'

export const useCartStore = defineStore('cart', {
  state: () => {
    return { bookPurchases: [] as BookPurchaseDto[], totalPrice: 0 as number, id: 0 as number }
  },

  getters: {
    getTotalPrice: (state) => {
      return state.bookPurchases
        .map((book) => book.buyPrice)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    }
  },

  actions: {
    async fetchCart() {
      const { data } = await wordPlayFetch('cart')
        .get()
        .json<{ books: BookPurchaseDto[]; totalPrice: number; id: number }>()
      console.log(data.value)
      this.bookPurchases = await data.value.books
      this.totalPrice = data.value.totalPrice
      this.id = data.value.id
    },
    addToCart(bookPurchases: BookPurchaseDto[], totalPrice: number) {
      this.bookPurchases = bookPurchases
      this.totalPrice = totalPrice
    },

    async removeFromCart(bookId: number) {
      const { data} = await wordPlayFetch<{ books: BookPurchaseDto[]; totalPrice: number, id: number }>(`cart/book/${bookId}`)
        .json<{ books: BookPurchaseDto[]; totalPrice: number, id: number }>()
        .delete()

      this.bookPurchases = data.value.books
      this.totalPrice = data.value.totalPrice
      // this.bookPurchases = this.bookPurchases.filter((book) => book.id !== bookId)
    }
  }
})
