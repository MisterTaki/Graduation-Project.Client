import Vue from 'vue';
import LoadingBar from './LoadingBar.vue';

function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

LoadingBar.newInstance = (properties) => {
  /* eslint-disable no-underscore-dangle */
  const _props = properties || {};

  let props = '';
  Object.keys(_props).forEach((prop) => {
    props += ` :${camelcaseToHyphen(prop)}=${prop}`;
  });

  const div = document.createElement('div');
  div.innerHTML = `<loading-bar${props}></loading-bar>`;
  document.body.appendChild(div);

  const loadingBar = new Vue({
    el: div,
    data: _props,
    components: { LoadingBar }
  }).$children[0];

  return {
    update (options) {
      if ('percent' in options) {
        loadingBar.percent = options.percent;
      }
      if (options.status) {
        loadingBar.status = options.status;
      }
      if ('show' in options) {
        loadingBar.show = options.show;
      }
    },
    component: loadingBar,
    destroy () {
      document.body.removeChild(div);
    }
  };
};

export default LoadingBar;
