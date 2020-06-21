import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Mixin extends Vue {
	public $t(key: string) {
		const tmp: any = this;
		return tmp.$vuetify.lang.t('$vuetify.' + key);
	}
}
