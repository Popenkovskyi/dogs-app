import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/layout-main.vue'),
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: () => import('@/pages/HomePage.vue')
        },
        {
          path: '/random-dog',
          name: 'RandomDogPage',
          component: () => import('@/pages/RandomDogPage.vue')
        },
      ],
    },
  ],
})
