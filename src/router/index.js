import Vue from 'vue';
import Router from 'vue-router';
import { Login, User, UserViews, NotFound } from '@/components';

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
      component: User,
      children: [
        {
          name: 'home',
          path: 'home',
          component: UserViews.Home
        },
        {
          name: 'notification',
          path: 'notification',
          component: UserViews.Notification
        },
        {
          name: 'user-settings',
          path: 'user-settings',
          component: UserViews.UserSettings
        },
        {
          name: 'publish-notice',
          path: 'publish-notice',
          component: UserViews.PublishNotice
        },
        {
          name: 'my-teacher',
          path: 'my-teacher',
          component: UserViews.MyTeacher
        },
        {
          name: 'choose-teacher',
          path: 'choose-teacher',
          component: UserViews.ChooseTeacher
        },
        {
          name: 'my-students',
          path: 'my-students',
          component: UserViews.MyStudents
        },
        {
          name: 'submit-report',
          path: 'submit-report',
          component: UserViews.SubmitReport
        },
        {
          name: 'review-report',
          path: 'review-report',
          component: UserViews.ReviewReport
        },
        {
          name: 'data-share',
          path: 'data-share',
          component: UserViews.DataShare
        },
        {
          name: 'reply-schedule',
          path: 'reply-schedule',
          component: UserViews.ReplySchedule
        },
        {
          name: 'account-manage',
          path: 'account-manage',
          component: UserViews.AccountManage
        },
        {
          name: 'system-settings',
          path: 'system-settings',
          component: UserViews.SystemSettings
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
