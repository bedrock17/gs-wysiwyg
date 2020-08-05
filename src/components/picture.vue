<template>
	<div>
		<v-dialog v-model="$attrs.value" class="wrap">
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
import { ImageUploader, ImageUploaderParam} from '@/editor_script/types';

@Component
export default class PicturePopup extends Vue {

	// @Prop() private uploader: ImageUploader | null = null;
	// @Prop() private uploaderParam: ImageUploaderParam | null = null;

	private url: string = '';

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

	private closeDialog(): void {
		this.$emit('input', false);
	}
}
</script>
