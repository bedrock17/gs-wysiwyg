<template>
	<div>
		<vue-good-table
			class="gs-table-custom"
			:columns="cols"
			:sort-options="{ enabled: false }"
			@on-cell-context="showContextMenu"
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
		<context-list
			ref="context"
			width="150px"
			:context="ctx" />
	</div>
</template>

<style scoped>

</style>

<script lang="ts">
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import ContextList from './context-list.vue';
import { CtxListItem } from './context-list.vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

interface VgtColumn {
	label: string;
	field: string;
	filterable?: true;
	typedef?: object;
}

interface VgtCtxEvent {
	row: (object | null);
	column: VgtColumn;
	rowIndex: number;
	colIndex: number;
	event: MouseEvent;
}

@Component({
	components: {
		VueGoodTable,
		ContextList,
	},
	mounted() {
		const comps = this as GsTable;
		comps.rows = [
			{ 'id': 1, 'field-1': 'Header' },
		];
		comps.cols = [
			{
				label: 'Hello',
				field: 'field-1',
			},
		];
	},
})
export default class GsTable extends Vue {
	private cols: VgtColumn[] = [];
	private rows: object[] = [];
	private ctx: any[] = [
		[
			{ name: 'ttt', func: () => {} },
		]
	];

	private headerSync(evt: Event, column: VgtColumn) {
		const target: HTMLElement = evt.target as HTMLElement;
		column.label = target.innerText;
	}

	private showContextMenu(data: VgtCtxEvent) {
		const ctx: ContextList = this.$refs.context as ContextList;
		ctx.open(data.event);
	}
}
</script>
