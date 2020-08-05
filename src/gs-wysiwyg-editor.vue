<template>
	<div>
		<div class="gs-editor" ref="editor" contenteditable 
		@input="handleInput" 
		@mouseup="updateEditerToolbar"
		@keydown.tab="editor.insertTab"
		@keydown="updateEditerToolbar"
		@keypress="updateEditerToolbar"
		>
		</div>
		<Table :editable="true"/>
		<html-box :editable="true" />
		
		<div v-if="editor != null">
			<Picture v-model="editor.showPictureDialog"> </Picture>
		</div>
	</div>
</template>

<style>
	.gs-editor {
		padding: 1rem 2.5rem;
		overflow: hidden;
	}
</style>

<script lang="ts">
import Vue from 'vue';
import ICC from './icc';
import {GSEditor} from './editor_script/gseditor';
import Table from '@/utils/table.vue';
import { Component } from 'vue-property-decorator';
import HtmlBox from '@/utils/html-box.vue';
import { GSHotKey } from '@/editor_script/hotkey';
import Picture from '@/components/picture.vue';

@Component({
	components: {
		Table,
		HtmlBox,
		Picture,
	},
})
export default class EditorComponent extends Vue {
	private editor: GSEditor | null = null;
	private hotkey: GSHotKey | null = null;

	private handleInput(): void {
		if (this.editor != null) {
			this.$emit('input', this.editor.getHTML());
		}
	}

	private updateEditerToolbar(event: any): void {
		// 현재 커서의 상태를 보고
		// toolbar로 이벤트를 보낸다.
		if (this.editor != null) {
			this.editor.updateToolbar();
		}
	}

	private mounted() {
		const EICC = ICC['editor-icc'];
		this.editor = new GSEditor(this.$refs.editor, ICC);
		this.hotkey = new GSHotKey(this.$refs.editor as HTMLElement);
	}
}
</script>
