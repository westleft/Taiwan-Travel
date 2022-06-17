import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Menu from '@/views/Menu.vue'
import Post from '@/views/Post.vue'

const routes: Array<RouteRecordRaw> =  [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/menu/:type',
    name: 'Menu',
    component: Menu,
  },{
    path: '/post/:id',
    name: 'Post',
    component: Post
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
