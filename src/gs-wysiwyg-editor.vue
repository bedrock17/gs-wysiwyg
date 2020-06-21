<template>
	<div>
		<div class="gs-editor" ref="editor" contenteditable 
		@input="handleInput" 
		@mouseup="updateEditerToolbar"
		@keydown="updateEditerToolbar"
		@keypress="updateEditerToolbar">
		</div>
        <Table/>
	</div>
</template>

<style>
	.gs-editor {
		padding: 1rem 2.5rem;
	}
</style>

<script lang="ts">
import Vue from 'vue';
import ICC from './icc';
import {GSEditor} from './editor_script/gseditor';
import Table from '@/utils/table.vue';
import Component from 'vue-class-component';

// @Component 데코레이터는 클래스가 Vue 컴포넌트임을 나타냅니다.
@Component({
	components: {
		Table,
	},
})
export default class EditorComponent extends Vue {
  // 초기 데이터는 인스턴스 속성으로 선언할 수 있습니다.
  // private message: string = 'Hello!'
	private editor: GSEditor | null = null;

  // 컴포넌트 메소드는 인스턴스 메소드로 선언할 수 있습니다.
	private handleInput(): void {
		if (this.editor != null) {
			this.$emit('input', this.editor.getHTML());
		}
	}

	private updateEditerToolbar(): void {
		// 현재 커서의 상태를 보고
		// toolbar로 이벤트를 보낸다.
		if (this.editor != null) {
			this.editor.updateToolbar();
		}
	}

	private mounted() {
		const EICC = ICC['editor-icc'];
		this.editor = new GSEditor(this.$refs.editor, ICC);
	}
}



</script>
