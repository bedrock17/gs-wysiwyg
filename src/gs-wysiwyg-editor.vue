<template>
	<div>
		<div class="gs-editor" ref="editor" contenteditable @input="handleInput">
		</div>

		
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
		handleInput(): void {
			this.$emit('input', this.editor.getHTML());
		},
	},
	mounted() {
		this.editor = new GSEditor(this.$refs.editor);
	},
});
</script>
