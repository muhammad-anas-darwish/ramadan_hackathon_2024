import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ToolsView from '../views/ToolsView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ToolsCreateView from '../views/ToolsCreateView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFound from '../components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ToolsView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordView
    },
    {
      path: '/reset-password/:id',
      name: 'ResetPassword',
      component: ResetPasswordView
    },
    {
      path: '/tools',
      name: 'Tools',
      component: ToolsView
    },
    {
      path: '/tools/create',
      name: 'Tools.Create',
      component: ToolsCreateView
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: ProfileView
    },
    {
      // path: "/:notFound",
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ]
})

export default router
