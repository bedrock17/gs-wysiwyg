import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

// Avoid duplication vue use
import Vuetify from 'vuetify/lib';
Vue.use(Vuetify);

import GlobalMixin from '@/plugins/mixin';
Vue.mixin(GlobalMixin);

Vue.config.productionTip = false;

new Vue({
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
