import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import GlobalMixin from '@/plugins/mixin';
Vue.mixin(GlobalMixin);

Vue.config.productionTip = false;

new Vue({
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
