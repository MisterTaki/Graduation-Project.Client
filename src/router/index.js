import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
import * as Views from '@/views';
import { User } from '@/components';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Views.Login
    },
    {
      path: '/user',
      name: 'user',
      component: Views.User,
      children: [
        {
          name: 'home',
          path: 'home',
          component: User.Common.Home,
          meta: { identity: 'common' }
        },
        {
          name: 'message',
          path: 'message',
          component: User.Common.Message,
          meta: { identity: 'common' }
        },
        {
          name: 'user-settings',
          path: 'user-settings',
          component: User.Common.UserSettings,
          meta: { identity: 'common' }
        },
        {
          name: 'data-share',
          path: 'data-share',
          component: User.Common.DataShare,
          meta: { identity: 'common' }
        },
        {
          name: 'my-teacher',
          path: 'my-teacher',
          component: User.Student.MyTeacher,
          meta: { identity: 'student' }
        },
        {
          name: 'choose-teacher',
          path: 'choose-teacher',
          component: User.Student.ChooseTeacher,
          meta: { identity: 'student' }
        },
        {
          name: 'submit-report',
          path: 'submit-report',
          component: User.Student.SubmitReport,
          meta: { identity: 'student' }
        },
        {
          name: 'choose-students',
          path: 'choose-students',
          component: User.Teacher.ChooseStudents,
          meta: { identity: 'teacher' }
        },
        {
          name: 'my-students',
          path: 'my-students',
          component: User.Teacher.MyStudents,
          meta: { identity: 'teacher' }
        },
        {
          name: 'review-report',
          path: 'review-report',
          component: User.Teacher.ReviewReport,
          meta: { identity: 'teacher' }
        },
        {
          name: 'reply-schedule',
          path: 'reply-schedule',
          component: User.Admin.ReplySchedule,
          meta: { identity: 'admin' }
        },
        {
          name: 'account-manage',
          path: 'account-manage',
          component: User.Admin.AccountManage,
          meta: { identity: 'admin' }
        },
        {
          name: 'publish-notice',
          path: 'publish-notice',
          component: User.Admin.PublishNotice,
          meta: { identity: 'admin' }
        },
        {
          name: 'system-settings',
          path: 'system-settings',
          component: User.Admin.SystemSettings,
          meta: { identity: 'admin' }
        }
      ],
      beforeEnter: (to, from, next) => {
        const token = window.localStorage.getItem('token');
        const identity = window.localStorage.getItem('identity');
        const username = window.localStorage.getItem('username');
        if (token && identity && username) {
          if (to.matched.some(record => record.meta.identity === identity || record.meta.identity === 'common')) {
            return next();
          }
          window.localStorage.clear();
          Message.closeAll();
          Message.error('身份验证错误，请重新登录');
          return next('/login');
        }
        Message.error('尚未登录');
        return next('/login');
      }
    },
    {
      path: '*',
      name: 'not-found',
      component: Views.NotFound,
    },
  ],
});

export default router;
