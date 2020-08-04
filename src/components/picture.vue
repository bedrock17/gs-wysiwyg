<template>
	<div>
		<v-dialog v-model="show" class="wrap">
			<v-card>
				<v-card-title>
					<span>Image</span>
					<v-spacer></v-spacer>
				</v-card-title>
				<form ref="form">
					<input type="file" name="image" @change="changeHandler" ref="file">
				</form>
				<div class="ve-preview" v-if="url"><img :src="url"></div>
				<v-card-actions>
					<v-btn color="primary" text @click="closeDialog()" >
						CANCEL
					</v-btn>
					<v-btn color="primary" text>
						OK
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<style lang="scss" scoped>
	@media all and (max-width: 500px) {
		.wrap {
			width:100%;
		}
	}
	@media all and (min-width: 500px) {
		.wrap {
			width: 500px;
		}
	}

	.wrap {
		position: relative;
		top: 50%;
		background: #fff;
		margin: 0 auto;
		transform: translateY(-60%);
	}

	.ve-preview {
		margin: 20px;
		overflow: scroll;
	}

	form {
		margin: 20px;
	}

</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { ImageUploader } from '@/editor_script/types';

@Component
export default class PicturePopup extends Vue {

	@Prop({default: true}) private dialog: boolean = true;
	@Prop({default: null}) private uploader: ImageUploader | null = null;

	private url: string = '';

	private show: boolean = true;

	private mounted() {
		this.show = this.dialog;
	}

	private changeHandler() {
		const file = this.$refs.file as HTMLInputElement;

		if (file.files === null) {
			return;
		}

		const item = file.files.item(0);
		if (item === null) {
			return;
		}

		if (item.type.indexOf('image') !== -1) {
			this.url = window.URL.createObjectURL(item);
		}

	}

	@Watch('show')
	private closeDialog(): void {
		this.$emit('input', false);
	}

	//TODO: 이미지 업로드 처리
}
</script>
