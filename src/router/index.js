import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Active from '../components/menu/active.vue'
import Resturant from '../components/menu/resturant.vue'
import Hotel from '../components/menu/hotel.vue'
import ScenicSpot from '../components/menu/scenicSpot.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/menu',
    name: 'Menu',
    component: Menu,
    children: [
      {
        path: "active",
        component: Active,
      },{
        path: "resturant",
        component: Resturant,
      },{
        path: "hotel",
        component: Hotel,
      },{
        path: "scenicSpot",
        component: ScenicSpot,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
