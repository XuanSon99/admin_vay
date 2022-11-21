import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/user/:id',
    name: 'Infomation',
    component: () => import('../views/Infomation.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/loan',
    name: 'Loan',
    component: () => import('../views/Loan.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: () => import('../views/Withdraw.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/bill',
    name: 'Bill',
    component: () => import('../views/Bill.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("access_token")) next({ name: 'Home' })
      next()
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem("access_token")) next({ name: 'Login' })
  next()
})

export default router
