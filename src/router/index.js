import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import NotFound from '@/views/404';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        level: 'student'
      },
    },
    {
      path: '/:level/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
