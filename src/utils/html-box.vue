<template>
	<div v-if="editable">
		<v-content
			class="ma-6"
			style="box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);">
			<v-row class="px-3">
				<v-col cols="12" class="ma-0 pa-0">
					<v-btn-toggle
						v-model="sourceView"
						tile
						color="teal darken-5"
						group>
						<v-btn value="html">
							HTML
						</v-btn>
						<v-btn value="preview">
							PREVIEW
						</v-btn>
					</v-btn-toggle>
				</v-col>
			</v-row>
			<v-row class="html-box ma-0 px-1">
				<v-col
					class="pa-0 ma-0 mt-0"
					v-if="sourceView === 'html'"
					cols="12">
					<monaco-editor
						class="editor"
						v-model="code"
						language="html"
						theme="vs"
						:options="editorOptions" />
				</v-col>
				<v-col
					v-else
					v-html="code"
					cols="12">
				</v-col>
			</v-row>

			<!--
			-->
		</v-content>
	</div>
	<div v-else v-html="code">
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import GlobalMixins from '@/plugins/mixin';
import MonacoEditor from 'vue-monaco';

@Component({
	components: {
		MonacoEditor,
	},
})
export default class HtmlBox extends Mixins(GlobalMixins) {
	@Prop(Boolean) private editable!: boolean;

	private editorOptions: object = {
		automaticLayout: true,
	};

	private sourceView: string = 'html';
	private code: string = '';
}
</script>

<style scoped>
.html-box {
	min-height: 500px;
}

.editor {
	width: 100%;
	height: 100%;
}

.editor > .monaco-editor {
	margin: 0;
	width: 100% !important;
	padding-top: 7px;
}
.editor > .monaco-editor > .overflow-guard {
	margin: 0;
	width: 100% !important;
}
</style>
