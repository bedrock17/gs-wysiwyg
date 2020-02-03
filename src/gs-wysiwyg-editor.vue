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

const EICC = ICC['editor-icc'];

EICC.on('erase', () => {
	// tslint:disable-next-line
	console.log("resive event erase");
});

EICC.on('undo', () => {
	// tslint:disable-next-line
	console.log("resive event undo");
});

EICC.on('redo', () => {
	// tslint:disable-next-line
	console.log("resive event redo");
});

EICC.on('change-align', (align: string) => {
	// tslint:disable-next-line
	console.log("resive event change-align", align);
});

EICC.on('text-front-color-change', (color: string) => {
	// tslint:disable-next-line
	console.log("resive event text-front-color-change", color);
});

EICC.on('text-back-color-change', (color: string) => {
	// tslint:disable-next-line
	console.log("resive event text-back-color-change", color);
});

EICC.on('insert-picture', () => {
	// tslint:disable-next-line
	console.log("resive event insert-picture");
});

EICC.on('insert-table', () => {
	// tslint:disable-next-line
	console.log("resive event insert-table");
});

EICC.on('view-html', () => {
	// tslint:disable-next-line
	console.log("resive event view-html");
});

EICC.on('view-markdown', () => {
	// tslint:disable-next-line
	console.log("resive event view-markdown");
});

EICC.on('code-block', (code: string) => {
	// tslint:disable-next-line
	console.log("resive event code-block", code);
});

EICC.on('tag-change', (tag: string) => {
	// tslint:disable-next-line
	console.log("resive event tag-change", tag);
});

EICC.on('font-change', (font: string) => {
	// tslint:disable-next-line
	console.log("resive event font-change", font);
});

EICC.on('size-change', (size: string) => {
	// tslint:disable-next-line
	console.log("resive event size-change", size);
});

EICC.on('toggle-bold', (bold: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-bold", bold);
});

EICC.on('toggle-italic', (italic: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-italic", italic);
});

EICC.on('toggle-underline', (underline: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-underline", underline);
});

EICC.on('toggle-strike', (strike: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-strike", strike);
});

EICC.on('toggle-sub-super', (sub: boolean, sup: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-sub", sub, sup);
});

EICC.on('add-link', (link: string) => {
	// tslint:disable-next-line
	console.log("resive event add-link", link);
});

EICC.on('del-link', () => {
	// tslint:disable-next-line
	console.log("resive event del-link");
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
