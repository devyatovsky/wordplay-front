<script setup lang="ts">
import LoginCard from '@/components/login/LoginCard.vue'
import { ref } from 'vue'
import RegisterCard from '@/components/login/RegisterCard.vue'

const isLogin = ref(true)
</script>

<template>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left pl-14">
          <h1 class="text-5xl font-bold">Начни читать сейчас!📚</h1>
          <p class="py-6">
            В каждой книге у нас - не просто слова, а настоящая игра, которая открывает перед вами
            мир словесных приключений и бесконечных возможностей!
          </p>
        </div>

        <LoginCard key="1" v-if="isLogin" v-model="isLogin" />
        <RegisterCard v-else v-model="isLogin" />
      </div>
    </div>
</template>
