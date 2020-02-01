<template>
    <div class="gs-editor" contenteditable>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ICC from './icc';

ICC['editor-icc'].on('editor-icc', (method: string, val: any) => {
	// tslint:disable-next-line
	console.log(method, val);
});

export default Vue.extend({
	name: 'Editor',

	components: {
	},

	data: () => ({
		//
	}),
});
</script>
