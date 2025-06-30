import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/form',
      name: 'FormTicket',
      component: () => import('../views/FormView.vue') 
    },
    {
      path: '/tickets',
      name: 'TicketList',
      component: () => import('../views/TicketListView.vue') 
    },
    {
      path: '/tickets/:id/edit',
      name: 'EditTicket',
      component: () => import('@/views/EditTicket.vue')
    },
    {
    path: '/tickets/create',
    name: 'CreateTicket',
    component: () => import('../views/FormView.vue')
  },
  ]
})

export default router
