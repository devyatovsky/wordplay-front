import './assets/base.css'
import { pinia } from './stores/index'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'


const app = createApp(App)
app.use(router)
  .use(pinia)
  .use(mdiVue, {icons: mdijs})
  .mount('#app')
// pinia.use(useCartStore)
//
// useCartStore().fetch();


