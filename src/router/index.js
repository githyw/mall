import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/home/home.vue')
const category = () => import('../views/category/category.vue')
const cart = () => import('../views/cart/cart.vue')
const profile = () => import('../views/profile/profile.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: category
  }, {
    path: '/cart',
    name: 'cart',
    component: cart
  }, {
    path: '/profile',
    name: 'profile',
    component: profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
