<script setup lang="ts">
import { useAuthStore } from '@/stores/counter'
import { useFetch } from '@vueuse/core/index'
import router from '@/router/index'
import { reactive, ref, toRaw } from 'vue'
import type { UserDto } from "@/types/User";

const emits = defineEmits<{
  (event: 'update:modelValue', payload: boolean | null): void
}>()

const registerForm = reactive({
  username: '',
  password: '',
  fullName: '',
  avatar: ''
})

const authStore = useAuthStore()

const uploadedImage = ref<FormData>()

const { data, execute, onFetchResponse } = useFetch('http://localhost:8080/api/auth/signup', {
  immediate: false
})
  .post(registerForm)
  .json()

const fetchImage = useFetch('http://localhost:8080/api/img/upload', { immediate: false })
  .post(uploadedImage)
  .json()

onFetchResponse(() => {
  console.log(fetchImage.data.value);
  authStore.login(data.value.token, toRaw(registerForm))
  console.log('dscx!!!');
  router.push('/')
})
fetchImage.onFetchResponse( () => {
  console.log(fetchImage.data.value.second);
  registerForm.avatar = fetchImage.data!!.value.second as string
  console.log(registerForm)
  execute()
  console.log('done');
})

const handleRegister = async () => {
  await fetchImage.execute()
}

const uploadImage = (param: any) => {
  let formData = new FormData()
  formData.append('name', 'my-picture')
  formData.append('file', param.target.files[0])
  uploadedImage.value = formData
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
          v-model="registerForm.username"
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
          v-model="registerForm.password"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Полное имя</span>
        </label>
        <input
          type="text"
          placeholder="Полное имя"
          class="input input-bordered"
          v-model="registerForm.fullName"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Аватарка</span>
        </label>
        <input
          type="file"
          class="file-input file-input-bordered file-input-info w-full max-w-xs"
          @change="uploadImage($event)"
        />
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary join-item" @click="handleRegister">
          Зарегистрироваться
        </button>
      </div>
      <div class="form-control">
        <button
          class="btn btn-secondary btn-sm join-item"
          @click="emits('update:modelValue', true)"
        >
          У меня есть учетная запись
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>