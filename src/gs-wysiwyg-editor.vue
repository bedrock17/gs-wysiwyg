<template>
	<div>
		<div class="gs-editor" ref="editor" contenteditable @input="handleInput" @mouseup="handleMouseUp">
		</div>
		<Table/>
	</div>
</template>

<style>
	.gs-editor {
		padding: 0 2.5rem;
	}
</style>

<script lang="ts">
import Vue from 'vue';
import ICC from './icc';
import {GSEditor} from './editor_script/gseditor';
import Table from './utils/table.vue';

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

const hexToRgbString = (hex): string|null => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	if (result == null) {
		return null;
	}

	const r = parseInt(result[1], 16).toString();
	const g = parseInt(result[2], 16).toString();
	const b = parseInt(result[3], 16).toString();

	return `rgba(${r},${g},${b},1)`;
};

EICC.on('text-front-color-change', (color: string) => {
	// tslint:disable-next-line
	console.log("resive event text-front-color-change", color);
	const retVal = hexToRgbString(color);
	if (retVal == null) {
		return;
	}
	color = retVal;
	document.execCommand('foreColor', true, color);
});

EICC.on('text-back-color-change', (color: string) => {
	// tslint:disable-next-line
	console.log("resive event text-back-color-change", color);
	const retVal = hexToRgbString(color);
	if (retVal == null) {
		return;
	}
	color = retVal;
	document.execCommand('backColor', true, color);
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
	document.execCommand('bold');
});

EICC.on('toggle-italic', (italic: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-italic", italic);
	document.execCommand('italic');
});

EICC.on('toggle-underline', (underline: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-underline", underline);
	document.execCommand('underline');
});

EICC.on('toggle-strike', (strike: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-strike", strike);
	document.execCommand('strikeThrough');
});

EICC.on('toggle-sub-super', (sub: boolean, sup: boolean) => {
	// tslint:disable-next-line
	console.log("resive event toggle-sub", sub, sup);
	document.execCommand('superscript');
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
		Table,
	},

	data: () => ({
		editor: new GSEditor(null, null),
	}),
	methods: {
		handleInput(): void {
			this.$emit('input', this.editor.getHTML());
		},
		handleMouseUp(): void {
			//mouse up 이벤트가 발생했을 때 현재 선택된 부분을 파싱해서 ICC로 toolbar로 이벤트를 보낸다.
			this.editor.parse();
		},
	},
	mounted() {
		this.editor = new GSEditor(this.$refs.editor, ICC);
	},
});
</script>
