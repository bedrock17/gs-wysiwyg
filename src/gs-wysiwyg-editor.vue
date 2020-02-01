<template>
	<div>
		<div class="gs-editor" ref="editor" contenteditable>
		</div>

		<v-btn v-on:click=getContent> getHTML </v-btn>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import ICC from './icc';
import {GSEditor} from './gseditor';

ICC['editor-icc'].on('editor-icc', (method: string, val: any) => {
	// tslint:disable-next-line
	console.log(method, val);
});

export default Vue.extend({
	name: 'Editor',

	components: {
	},

	data: () => ({
		editor: new GSEditor(''),
	}),
	methods: {
		getContent(): void {
			console.log(this.editor.getHTML());
		},
	},
	mounted() {
		this.editor = new GSEditor(this.$refs.editor);
	},
});
</script>
