<template>
	<div>
		<vue-good-table
			class="gs-table-custom"
			:columns="cols"
			:sort-options="{ enabled: false }"
			@on-cell-context="showContextMenu"
			:rows="rows">
			<template slot="table-column" slot-scope="props">
				<div :contenteditable="editable" style="outline: none;" @input="headerSync($event, props.column)">
					test
				</div>
			</template>
			<template slot="table-row" slot-scope="props">
				<div :contenteditable="editable" style="outline: none;">
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
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import GlobalMixins from '@/plugins/mixin';

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
			{
				'id': 1,
				'field-1': 'Header',
				'field-2': 'Two',
				'field-3': 'Three',
			},
			{
				'id': 2,
				'field-1': 'Header',
				'field-2': 'Two',
				'field-3': 'Three',
			},
			{
				'id': 3,
				'field-1': 'Header',
				'field-2': 'Two',
				'field-3': 'Three',
			},
		];
		comps.cols = [
			{
				label: 'Hello',
				field: 'field-1',
			},
			{
				label: 'World',
				field: 'field-2',
			},
			{
				label: 'Table',
				field: 'field-3',
			},
		];
	},
})
export default class GsTable extends Mixins(GlobalMixins) {
	@Prop(Boolean) private editable!: boolean;
	private readonly ttt  =  this as Vue;

	// Contextmenu List
	private readonly addRowBottom: CtxListItem = {
		name: this.$t('table.row.add'),
		func: () => { /* empty */ },
	};

	private readonly delRow: CtxListItem = {
		name: this.$t('table.row.remove'),
		func: () => { /* empty */ },
	};

	private readonly addCellRight: CtxListItem = {
		name: this.$t('table.cell.add'),
		func: () => { /* empty */ },
	};

	private readonly delCell: CtxListItem = {
		name: this.$t('table.cell.remove'),
		func: () => { /* empty */ },
	};

	private readonly removeTable: CtxListItem = {
		name: this.$t('table.remove'),
		func: () => { /* empty */ },
	};

	private cols: VgtColumn[] = [];
	private rows: object[] = [];
	private ctx: CtxListItem[][] = [];

	private headerSync(evt: Event, column: VgtColumn) {
		const target: HTMLElement = evt.target as HTMLElement;
		column.label = target.innerText;
	}

	private showContextMenu(data: VgtCtxEvent) {
		this.ctx = [];

		this.ctx.push([]);
		this.ctx[0].push(this.addRowBottom);
		this.ctx[0].push(this.delRow);

		this.ctx.push([]);
		this.ctx[1].push(this.addCellRight);
		this.ctx[1].push(this.delCell);

		this.ctx.push([]);
		this.ctx[2].push(this.removeTable);

		const ctx: ContextList = this.$refs.context as ContextList;
		ctx.open(data.event, this.ctx);
	}
}
</script>
