<script setup lang="ts">

import { useFetch } from '@vueuse/core/index'
import type { WritableComputedRef } from "vue";
import { computed, watch } from "vue";
import type { PublisherDto } from "@/types/Book";

const props = defineProps<{ publisher: PublisherDto }>()
const emits = defineEmits(['update:publisher'])

const baseAuthorsUrl = 'http://localhost:8080/api/publisher?name='

const findAuthorUrl = computed(() => baseAuthorsUrl + props.publisher.name)

const { data, isFinished } = useFetch<PublisherDto[]>(findAuthorUrl, {
  immediate: false,
  refetch: true
}).get().json<PublisherDto[]>()

const refName: WritableComputedRef<string> = computed({
  get(): string {
    return props.publisher.name
  },
  set(newValue: string): void {
    emits('update:publisher', {id: props.publisher.id, name: newValue})
  },
});

watch(data, () => {
  if (data.value?.length == 0) {
    emits('update:publisher', null)
  }
})
</script>
<template>
  <div>
    <div class="dropdown w-full">
      <label class="label"><span class="label-text">Издатель</span></label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w"
        v-model="refName"
      />
      <ul
        tabindex="0"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        v-if="isFinished"
      >
        <li v-for="author in data" :key="author.id">
          <a @click="emits('update:publisher', author)">{{ author.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

