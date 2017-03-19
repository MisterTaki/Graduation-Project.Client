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
          name: 'home',
          path: 'home',
          component: User.Views.Home
        },
        {
          name: 'notification',
          path: 'notification',
          component: User.Views.Notification
        },
        {
          name: 'user-settings',
          path: 'user-settings',
          component: User.Views.UserSettings
        },
        {
          name: 'publish-notice',
          path: 'publish-notice',
          component: User.Views.PublishNotice
        },
        {
          name: 'my-teacher',
          path: 'my-teacher',
          component: User.Views.MyTeacher
        },
        {
          name: 'choose-teacher',
          path: 'choose-teacher',
          component: User.Views.ChooseTeacher
        },
        {
          name: 'my-students',
          path: 'my-students',
          component: User.Views.MyStudents
        },
        {
          name: 'submit-report',
          path: 'submit-report',
          component: User.Views.SubmitReport
        },
        {
          name: 'review-report',
          path: 'review-report',
          component: User.Views.ReviewReport
        },
        {
          name: 'data-share',
          path: 'data-share',
          component: User.Views.DataShare
        },
        {
          name: 'reply-schedule',
          path: 'reply-schedule',
          component: User.Views.ReplySchedule
        },
        {
          name: 'account-manage',
          path: 'account-manage',
          component: User.Views.AccountManage
        },
        {
          name: 'system-settings',
          path: 'system-settings',
          component: User.Views.SystemSettings
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
