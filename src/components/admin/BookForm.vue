<script setup lang="ts">
import type { BookDto } from '@/types/Book'
import { onMounted, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import AuthorSearch from '@/components/admin/AuthorSearch.vue'
import PublisherSearch from '@/components/admin/PublisherSearch.vue'
import { wordPlayFetch } from "@/fetch/wordPlayFetch";

const props = defineProps<{ book: BookDto; isVisible: boolean }>()
const emits = defineEmits(['update:isVisible'])
const bookCopy = ref<BookDto>(props.book)
const uploadedImage = ref()

const { data, execute, isFinished, onFetchFinally } = useFetch(
  'http://localhost:8080/api/img/upload',
  {
    immediate: false
  }
)
  .post(uploadedImage)
  .json<{ second: string }>()

onFetchFinally(() => console.log(data))
const uploadImage = (param: any) => {
  let formData = new FormData()
  formData.append('name', 'my-picture')
  formData.append('file', param.target.files[0])
  uploadedImage.value = formData
  bookCopy.value.cover = URL.createObjectURL(param.target.files[0])
}

onMounted(() => (bookCopy.value = props.book))
const handleClose = () => emits('update:isVisible', false)

const handleSave = async () => {
  if (uploadedImage.value) {
    console.log(uploadedImage.value)
    await execute().then(() => {
      if (data.value?.second) {
        bookCopy.value.cover = data.value.second
      }
      wordPlayFetch('books/edit')
        .post(bookCopy.value)
        .json()
        .onFetchFinally(() => handleClose())
    })
  } else {
    wordPlayFetch('books/edit')
      .post(bookCopy.value)
      .json()
      .onFetchFinally(() => handleClose())
  }
}
</script>

<template>
  <dialog id="my_modal_1" class="modal modal-open" v-if="isVisible && bookCopy">
    <div class="card card-side bg-base-100">
      <figure class="max-w-[420px] relative">
        <img
          :src="bookCopy.cover"
          class="object-cover h-[100%]"
          alt="Shoes"
          v-if="isFinished || bookCopy.cover"
        />
      </figure>
      <div class="card-body w-[500px]">
        <h3 class="font-bold text-lg">Изменить книгу</h3>
        <label class="label"><span class="label-text">Название</span></label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w"
          v-model="bookCopy.bookName"
        />
        <AuthorSearch v-model="bookCopy.author" />
        <PublisherSearch v-model:publisher="bookCopy.publisher" />
        <label class="label"><span class="label-text">Год издательства</span></label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w"
          v-model="bookCopy.publishYear"
          maxlength="4"
        />
        <label class="label">
          <span class="label-text">Цена</span>
          <span class="label-text self-baseline">
            (За аренду на месяц: {{ bookCopy.buyPrice / 4 }})
          </span>
        </label>
        <input
          type="number"
          placeholder="Type here"
          class="input input-bordered w-full max-w"
          v-model="bookCopy.buyPrice"
        />
        <div class="modal-action self-center">
          <form method="dialog">
            <div class="join">
              <label for="imageUpload" class="btn btn-accent join-item">Изменить обложку</label>
              <input
                type="file"
                class="file-input file-input-bordered hidden"
                id="imageUpload"
                @change="uploadImage($event)"
              />
              <button class="btn join-item btn-success" @click="handleSave">Сохранить</button>
              <button class="btn join-item btn-error" @click="handleClose">Закрыть</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>