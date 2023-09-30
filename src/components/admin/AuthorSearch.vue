<script setup lang="ts">
import { useFetch } from '@vueuse/core/index'
import { computed, ref, watch } from 'vue'
import type { AuthorDto } from '@/types/Book'
import { wordPlayFetch } from "@/fetch/wordPlayFetch";
const emits = defineEmits<{
  (event: 'update:modelValue', payload: AuthorDto | null): void;
}>()

const props = defineProps<{ modelValue: AuthorDto }>()
const authorCopy = ref<AuthorDto>(props.modelValue)

// onMounted(() => {
//   authorCopy.value.name = props;
// });
watch(authorCopy, () => {
  console.log(props.modelValue);
  console.log(authorCopy);
  emits('update:modelValue', authorCopy.value)
})
const baseAuthorsUrl = 'http://localhost:8080/api/authors?name='

const findAuthorUrl = computed(() => baseAuthorsUrl + authorCopy.value.name)

const { data, isFinished } = wordPlayFetch<AuthorDto[]>(findAuthorUrl, {
  immediate: false,
  refetch: true
})
  .get()
  .json<AuthorDto[]>()

// const nameAndCountry: WritableComputedRef<string> = computed({
//   get(): string {
//     console.log(props)
//     return authorCopy.value.name
//   },
//   set(newValue: string): void {
//     // if (props.author.id) {
//     emits('update:author', { id: 0, name: newValue })
//     // }
//   }
// })

watch(data, () => {
  if (data.value?.length == 0) {
    emits('update:modelValue', {name: authorCopy.value.name})
  }
})

const handleClick = (author: AuthorDto) => {
  authorCopy.value.name = author.name
  emits('update:modelValue', author)
}
</script>
<template>
  <div>
    <div class="dropdown w-full">
      <label class="label"><span class="label-text">Автор</span></label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w"
        v-model="authorCopy.name"
      />
      <ul
        tabindex="0"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        v-if="isFinished"
      >
        <li v-for="author in data" :key="author.id">
          <a @click="() => handleClick(author)">{{ author.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>