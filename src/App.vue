<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
			>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
					/>

					<v-img
						alt="Vuetify Name"
						class="shrink mt-1 hidden-sm-and-down"
						contain
						min-width="100"
						src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
						width="100"
						/>
			</div>

			<v-spacer></v-spacer>

			<v-btn
				href="https://github.com/vuetifyjs/vuetify/releases/latest"
				target="_blank"
				text
				>
				<span class="mr-2">Latest Release</span>
				<v-icon>mdi-open-in-new</v-icon>
			</v-btn>
		</v-app-bar>

		<v-content>
			<editor/>
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
import editor from './gs-wysiwyg-editor.vue';

export default Vue.extend({
	name: 'App',

	components: {
		editor,
	},

	data: () => ({
		//
	}),
});
</script>
