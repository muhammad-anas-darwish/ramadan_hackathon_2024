import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticate, isGuest } from './authGuard.js';
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import ToolsView from '../views/ToolsView.vue'
import UserToolsView from '../views/UserToolsView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ToolsCreateView from '../views/ToolsCreateView.vue'
import ProfileView from '../views/ProfileView.vue'
import ToolView from '../views/ToolView.vue'
import UserTransactionsView from '../views/UserTransactionsView.vue'
import TransactionRequestsView from '../views/TransactionRequestsView.vue'
import NotFound from '../components/NotFound.vue'
import Page401 from '../components/401.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ToolsView,
      beforeEnter: (to, from, next) => {
        isAuthenticate(to, from, next);
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        isGuest(to, from, next);
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        isGuest(to, from, next);
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordView,
      beforeEnter: (to, from, next) => {
        isGuest(to, from, next);
      }
    },
    {
      path: '/reset-password/:id',
      name: 'ResetPassword',
      component: ResetPasswordView,
      beforeEnter: (to, from, next) => {
        isGuest(to, from, next);
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView,
      beforeEnter: (to, from, next) => {
        isAuthenticate(to, from, next);
      }
    },
    {
      path: '/tools',
      name: 'Tools',
      component: ToolsView,
      beforeEnter: (to, from, next) => {
        isAuthenticate(to, from, next);
      }
    },
    {
      path: '/tools/create',
      name: 'Tools.Create',
      component: ToolsCreateView,
      beforeEnter: (to, from, next) => {
        isAuthenticate(to, from, next);
      }
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: ProfileView,
      // beforeEnter: (to, from, next) => {
      //   isAuthenticate(to, from, next);
      // }
    },
    {
      path: '/profile',
      name: 'MyProfile',
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        isAuthenticate(to, from, next);
      }
    },
    {
      path: '/tool/:id',
      name: 'Tool',
      component: ToolView,
      props: true,
      // beforeEnter: (to, from, next) => {
      //   isAuthenticate(to, from, next);
      // }
    },
    {
      // path: "/:notFound",
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
    {
      path: "/401",
      component: Page401,
    },
    {
      path: '/my-tools/',
      name: 'UserTools',
      component: UserToolsView,
      // beforeEnter: (to, from, next) => {
      //   isAuthenticate(to, from, next);
      // }
    },
    {
      path: '/my-transactions/',
      name: 'UserTransactions',
      component: UserTransactionsView,
      // beforeEnter: (to, from, next) => {
      //   isAuthenticate(to, from, next);
      // }
    },
    {
      path: '/transaction-requests',
      name: 'TransactionRequests',
      component: TransactionRequestsView,
      // beforeEnter: (to, from, next) => {
      //   isAuthenticate(to, from, next);
      // }
    },
  ]
})

export default router
