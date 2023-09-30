import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core";
import router from "@/router/index";
import type { UserDto } from "@/types/User";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useStorage('token', null),
    user: useStorage('user', {} as UserDto),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    avatar: state => state.user.avatar
  },

  actions: {
    login(token, user) {
      this.token = token;
      this.user = user;
    },

    logout() {
      this.token = null;
      this.user = null;
      this.$reset()
      router.push('/login')
    },
  },
});