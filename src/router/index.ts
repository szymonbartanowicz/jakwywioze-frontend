import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from "../views/LoginView.vue";
import PointView from "../views/PointView.vue";
import {usePointsStore} from "@/store/PointsStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/points/:id',
    name: 'point',
    component: PointView,
    beforeEnter: async  (to, from, next) => {
      const points = usePointsStore() ;
      await points.getPoint('2')
      next()
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
