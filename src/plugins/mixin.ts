import VUE from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import Vuetify from 'vuetify';

@Component
export default class Mixin extends Vue {
	public $t(key: string) {
		const tmp: any = this;
		return tmp.$vuetify.lang.t('$vuetify.' + key);
	}

	public mount(component: any, options: any = {}, selector?: (string | HTMLElement)) {
		const instanceComponent = VUE.extend(component);

		if ( typeof options.vuetify === 'undefined' ) {
			options.vuetify = new Vuetify();
		}

		const instance = new instanceComponent(options);
		instance.$mount(selector);

		return instance;
	}
}
