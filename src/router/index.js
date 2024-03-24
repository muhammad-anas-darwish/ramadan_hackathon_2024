import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ToolsView from '../views/ToolsView.vue'
import GovernoratesCreateView from '../views/GovernoratesCreateView.vue'
import CountriesCreateView from '../views/CountriesCreateView.vue'
import CountriesView from '../views/CountriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
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
      path: '/tools',
      name: 'Tools',
      component: ToolsView
    },
    {
      path: '/governorates/create',
      name: 'Governorates.Create',
      component: GovernoratesCreateView
    },
    {
      path: '/countries/create',
      name: 'Countries.Create',
      component: CountriesCreateView
    },
    {
      path: '/countries',
      name: 'Countries.all',
      component: CountriesView
    },
  ]
})

export default router
