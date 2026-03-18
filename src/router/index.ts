import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Base',
      component: () => import('../views/Base.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue'),
        },
        {
          path: 'yjwjgame/YJFrameWork',
          name: 'YJFrameWork',
          component: () => import('../views/yjwjgame/YJFrameWork.vue'),
        },
        {
          path: 'yjwjgame/YJWorld',
          name: 'YJWorld',
          component: () => import('../views/yjwjgame/YJWorld.vue'),
        },
        {
          path: 'yjwjgame/YJPerson',
          name: 'YJPerson',
          component: () => import('../views/yjwjgame/YJPerson.vue'),
        },
        {
          path: 'settings',
          name: 'BaseSettings',
          component: () => import('../views/BaseSettings.vue'),
        },
        {
          path: 'SmallTools',
          name: '小工具',
          component: () => import('../views/SmallTools.vue'),
        },
        {
          path: 'test2',
          name: 'Test2',
          component: () => import('../views/Test2.vue'),
        },
        {
          path: 'test3',
          name: 'Test3',
          component: () => import('../views/Test3.vue'),
        },
      ],
    },
  ],
})

export default router
