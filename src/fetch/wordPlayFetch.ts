import { createFetch } from "@vueuse/core";
import { useAuthStore } from "@/stores/counter";

export const wordPlayFetch = createFetch({
  baseUrl: 'http://localhost:8080/api/',
  options: {
    beforeFetch({ options }) {
      const authStore = useAuthStore()
      options.headers.Authorization = `Bearer ${authStore.token}`

      console.log(options.headers);
      return { options }
    },
  },
  // fetchOptions: {
  //   mode: 'no-cors',
  // },
})