import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Active from '../components/menu/active.vue'
import Resturant from '../components/menu/resturant.vue'
import Hotel from '../components/menu/hotel.vue'
import ScenicSpot from '../components/menu/scenicSpot.vue'
import Post from '../views/Post.vue'

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
  },{
    path: '/post/:id',
    name: 'Post',
    component: Post
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

// 換頁後視窗到最上面
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

export default router
