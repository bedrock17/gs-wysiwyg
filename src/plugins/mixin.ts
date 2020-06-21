import Vue from 'vue';


Vue.mixin({
	methods: {
		$t(key: string) {
			return this.$vuetify.lang.t('$vuetify.' + key);
		},
	},
});
