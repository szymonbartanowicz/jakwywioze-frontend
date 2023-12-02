import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {usePointsStore} from "@/store/PointsStore";
import {useAuthorizationStore} from "@/store/AuthorizationStore";
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from "@/views/LoginView.vue";
import PointView from "@/views/PointView.vue";
import ConfirmRegistration from '@/views/ConfirmRegistration.vue'
import SendResetPasswordEmail from "@/views/SendResetPasswordEmail.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Profile from "@/views/Profile.vue";
import AddDynamicPoint from "@/views/AddDynamicPoint.vue";

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
      await points.getPoint(to.params.id)
      next()
    }
  },
  {
    path: '/users/confirm-registration',
    name: 'confirm-registration',
    component: ConfirmRegistration,
  },
  {
    path: '/send-reset-password-email',
    name: 'send-reset-password-email',
    component: SendResetPasswordEmail,
  },
  {
    path: '/users/password-reset-confirmation',
    name: 'password-reset-confirmation',
    component: ResetPassword,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-dynamic-point',
    name: 'add-dynamic-point',
    component: AddDynamicPoint,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:notFound',
    name: 'not-found',
    redirect: {
      name: 'home'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const authorization = useAuthorizationStore()
  if (to.meta.requiresAuth) {
    if (authorization.isUserLoggedIn()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
