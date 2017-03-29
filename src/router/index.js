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
        identity: 'student'
      },
    },
    {
      path: '/:identity',
      name: 'user',
      component: User,
      children: [
        {
          name: 'home',
          path: 'home',
          component: UserViews.Common.Home
        },
        {
          name: 'notification',
          path: 'notification',
          component: UserViews.Common.Notification
        },
        {
          name: 'user-settings',
          path: 'user-settings',
          component: UserViews.Common.UserSettings
        },
        {
          name: 'data-share',
          path: 'data-share',
          component: UserViews.Common.DataShare
        },
        {
          name: 'my-teacher',
          path: 'my-teacher',
          component: UserViews.Student.MyTeacher
        },
        {
          name: 'choose-teacher',
          path: 'choose-teacher',
          component: UserViews.Student.ChooseTeacher
        },
        {
          name: 'submit-report',
          path: 'submit-report',
          component: UserViews.Student.SubmitReport
        },
        {
          name: 'choose-students',
          path: 'choose-students',
          component: UserViews.Teacher.ChooseStudents
        },
        {
          name: 'my-students',
          path: 'my-students',
          component: UserViews.Teacher.MyStudents
        },
        {
          name: 'review-report',
          path: 'review-report',
          component: UserViews.Teacher.ReviewReport
        },
        {
          name: 'reply-schedule',
          path: 'reply-schedule',
          component: UserViews.Admin.ReplySchedule
        },
        {
          name: 'account-manage',
          path: 'account-manage',
          component: UserViews.Admin.AccountManage
        },
        {
          name: 'publish-notice',
          path: 'publish-notice',
          component: UserViews.Admin.PublishNotice
        },
        {
          name: 'system-settings',
          path: 'system-settings',
          component: UserViews.Admin.SystemSettings
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
