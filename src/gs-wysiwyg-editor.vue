<template>
	<div>
		<div class="gs-editor" ref="editor" contenteditable @input="handleInput">
		</div>

		
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {GSEditor} from './gseditor';

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
