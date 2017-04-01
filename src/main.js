// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import { Row, Col, Dialog, Upload, Button, Table, Tabs, TabPane, TableColumn, Form, FormItem, Select, Option, Input, Radio, RadioGroup, Badge, Step, Steps, Dropdown, DropdownMenu, DropdownItem, datePicker } from 'element-ui';
import { Common } from '@/components';
import App from './App';
import router from './router';
import store from './store';

// 按需引入第三方组件
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Badge);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(datePicker);

Vue.config.productionTip = false; // Set this to false to prevent the production tip on Vue startup.
Vue.use(Vuex); // use Vuex.
sync(store, router); // use vuex-router-sync.

router.beforeEach((to, from, next) => {
  Common.LoadingBar.start();
  next();
});

router.afterEach(() => {
  Common.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
