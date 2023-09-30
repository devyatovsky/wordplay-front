import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue";
import AdminView from "@/views/AdminView.vue";
import CartView from "@/views/CartView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/counter";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hideHUD: true,
        routeTransition: 'slide-right'
      }
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: RegisterView,
    //   meta: {
    //     hideHUD: true,
    //     routeTransition: 'slide-left'
    //   }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore= useAuthStore()
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
export default router
