import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ToolsView from '../views/ToolsView.vue'
// import GovernoratesView from '../views/GovernoratesView.vue'
// import GovernoratesCreateView from '../views/GovernoratesCreateView.vue'
// import CountriesView from '../views/CountriesView.vue'
// import CountriesCreateView from '../views/CountriesCreateView.vue'
// import PlacesView from '../views/PlacesView.vue'
// import PlacesCreateView from '../views/PlacesCreateView.vue'

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
    // {
    //   path: '/governorates',
    //   name: 'Governorates.All',
    //   component: GovernoratesView
    // },
    // {
    //   path: '/governorates/create',
    //   name: 'Governorates.Create',
    //   component: GovernoratesCreateView
    // },
    // {
    //   path: '/countries',
    //   name: 'Countries.All',
    //   component: CountriesView
    // },
    // {
    //   path: '/countries/create',
    //   name: 'Countries.Create',
    //   component: CountriesCreateView
    // },
    // {
    //   path: '/places',
    //   name: 'Places.All',
    //   component: PlacesView
    // },
    // {
    //   path: '/places/create',
    //   name: 'Places.Create',
    //   component: PlacesCreateView
    // },
  ]
})

export default router
