// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Row, Col, Dialog, Upload, Button, Table, TableColumn, Form, FormItem, Select, Option, Input, Radio, RadioGroup, Badge, Step, Steps } from 'element-ui';
import App from './App';
import router from './router';

// 按需引入element-ui组件
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Button);
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

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
