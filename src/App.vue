<template>
	<v-app>
		<v-content>
			<v-card :elevation="3">
				<GSToolbar/>
			</v-card>
			<br><br><br>
			<GSEditor ref="GSEditor" v-model="htmlText"/>

			{{ htmlText }}
			
		</v-content>
	</v-app>
</template>

<style lang="css">
    .gs-editor {
		border: 1px solid rgb(22, 97, 181);
		/* border-radius: 10px; */
        width: calc(100%-20px);
        min-height: 200px;
		margin: 10px;
    }
</style>

<script lang="ts">
import Vue from 'vue';
import GSToolbar from './gs-wysiwyg-toolbar.vue';
import GSEditor from './gs-wysiwyg-editor.vue';

export default Vue.extend({
	name: 'App',

	components: {
		GSToolbar,
		GSEditor,
	},

	data: () => ({
		htmlText: '',
	}),

	methods: {
		//
	},
});
</script>
