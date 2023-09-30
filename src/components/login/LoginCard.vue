<script setup lang="ts">
import { useAuthStore } from "@/stores/counter";
import { reactive } from "vue";
import { useFetch } from "@vueuse/core/index";
import type { UserDto } from "@/types/User";
import router from "@/router/index";

const authStore = useAuthStore()

const emits = defineEmits<{
  (event: 'update:modelValue', payload: boolean | null): void;
}>()

const form = reactive({
  username: '',
  password: ''
})

const { data, execute, onFetchResponse } = useFetch<UserDto>(
  'http://localhost:8080/api/auth/signin',
  { immediate: false }
)
  .post(form)
  .json<{token: string, user: UserDto }>()

onFetchResponse(() => {
  authStore.login(data.value.token, data.value.user)
  router.push('/')
})

const handleLogin = () => {
  execute()
}

</script>

<template>
  <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <div class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Имя пользователя</span>
        </label>
        <input
          type="text"
          placeholder="Имя пользователя"
          class="input input-bordered"
          v-model="form.username"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Пароль</span>
        </label>
        <input
          type="password"
          placeholder="Пароль"
          class="input input-bordered"
          v-model="form.password"
        />
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary join-item" @click="handleLogin">Вперед!</button>
      </div>
      <div class="form-control" >
        <button class="btn btn-secondary btn-sm join-item" @click="emits('update:modelValue', false)">
          Зарегистрироваться
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>