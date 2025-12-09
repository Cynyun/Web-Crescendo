import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Base',
      component: () => import('../views/Base.vue'),
    },
    {
      path: '/img',
      name: 'Test',
      component: () => import('../views/ShowImage.vue'),
    },
  ],
})

export default router
