<template>
	<div v-if="view">
		<vue-good-table
			class="gs-table-custom"
			:columns="cols"
			:sort-options="{ enabled: false }"
			@contextmenu="showContextMenu"
			:rows="rows">
			<template slot="table-column" slot-scope="props">
				<div contenteditable style="outline: none;" @input="headerSync($event, props.column)">
					test
				</div>
			</template>
			<template slot="table-row" slot-scope="props">
				<div contenteditable style="outline: none;">
					{{ props.formattedRow[props.column.field] }}
				</div>
			</template>
		</vue-good-table>
	</div>
</template>

<style scoped>

</style>

<script lang="ts">
import Vue from 'vue';
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

export default Vue.extend({
	name: 'GsTable',
	components: {
		VueGoodTable,
	},
	methods: {
		headerSync(evt: Event, column: any) {
			const target: HTMLElement = evt.target as HTMLElement;
			column.label = target.innerText;
		},
		showContextMenu(evt: Event) {
			console.log(evt);
		},
	},
	// tslint:disable-next-line
	data() {
		return {
			view: true,
			cols: [
				{ label: 'Header', field: 'field-1' },
			],
			rows: [
				{ 'id': 1, 'field-1': 'Hello?' },
			],
		};
	},
});
</script>
