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
      path: '/yjwjgame/YJFrameWork',
      name: 'YJFrameWork',
      component: () => import('../views/yjwjgame/YJFrameWork.vue'),
    },
    {
      path: '/yjwjgame/YJWorld',
      name: 'YJWorld',
      component: () => import('../views/yjwjgame/YJWorld.vue'),
    },
    {
      path: '/yjwjgame/YJPerson',
      name: 'YJPerson',
      component: () => import('../views/yjwjgame/YJPerson.vue'),
    },
  ],
})

export default router
