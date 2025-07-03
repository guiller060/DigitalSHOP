import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductView from '../views/ProductView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'
import CheckoutPage from '../views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ShoppingCartView
  },
  {
    path: '/checkout',
    name: 'CheckoutPage',
    component: CheckoutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router