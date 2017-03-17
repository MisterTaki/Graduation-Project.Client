import Vue from 'vue';
import Router from 'vue-router';
import { Login, User, NotFound } from '@/components';

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
      name: 'login',
      component: Login,
      meta: {
        level: 'student'
      },
    },
    {
      path: '/:level',
      name: 'user',
      component: User.Layout,
      children: [
        {
          path: 'home',
          component: User.Views.Home
        },
        {
          path: 'user-settings',
          component: User.Views.UserSettings
        }
      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
