import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Auth from '../views/Auth.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: About
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/notes/:id',
    name: 'Note',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.path.includes('/auth')) {
    next();
  }
  const isPresentation = !localStorage.getItem("key") ? true : false;
  if (isPresentation && !to.query.presentation) {
    next({
      path: to.path,
      query: { presentation: "true" }
    })
  } else {
    next();
  }
});

export default router
