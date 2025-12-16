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
      path: '/framework',
      name: 'FrameWork',
      component: () => import('../views/FrameWork.vue'),
    },
    {
      path: '/world',
      name: 'World',
      component: () => import('../views/World.vue'),
    },
    {
      path: '/person',
      name: 'Person',
      component: () => import('../views/Person.vue'),
    },
  ],
})

export default router
