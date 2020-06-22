<template>
	<div v-if="show">
		<vue-good-table
			class="gs-table-custom"
			:columns="cols"
			:sort-options="{ enabled: false }"
			@on-cell-context="showContextMenu"
			:rows="rows">
			<template slot="table-column" slot-scope="props">
				<div
					:contenteditable="editable"
					style="outline: none;"
					@input="sync($event, props.column)">
					{{ props.column.label }}
				</div>
			</template>
			<template slot="table-row" slot-scope="props">
				<div
					:contenteditable="editable"
					style="outline: none;"
					@input="sync($event, props.column, props.row)">
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
import { getRange } from '@/editor_script/browser';

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
		// for example template
		const comps = this as GsTable;
		comps.rows = [
			{
				'id': 1,
				'field-0': 'John',
				'field-1': '28',
				'field-2': 'Male',
			},
			{
				'id': 2,
				'field-0': 'Nara',
				'field-1': '17',
				'field-2': 'Female',
			},
			{
				'id': 3,
				'field-0': 'Park',
				'field-1': '55',
				'field-2': 'Male',
			},
		];
		comps.cols = [
			{
				label: 'Name',
				field: 'field-0',
			},
			{
				label: 'Age',
				field: 'field-1',
			},
			{
				label: 'Sex',
				field: 'field-2',
			},
		];
	},
})
export default class GsTable extends Mixins(GlobalMixins) {
	@Prop(Boolean) private editable!: boolean;

	private cols: VgtColumn[] = [];
	private rows: object[] = [];
	private ctx: CtxListItem[][] = [];
	private show: boolean = true;

	// Contextmenu List
	private readonly addRowBottom: CtxListItem = {
		name: this.$t('table.row.add'),
		func: (evt: MouseEvent, idx: number, ctx: CtxListItem, gsTable: GsTable, data: VgtCtxEvent) => {
			const row = { id: Date.now() };
			for ( const col of gsTable.cols ) {
				row[col.field] = '';
			}

			if ( data.rowIndex === -1 ) {
				gsTable.rows.unshift(row);
			} else {
				gsTable.rows.splice(data.rowIndex + 1, 0, row);
			}
		},
	};

	private readonly delRow: CtxListItem = {
		name: this.$t('table.row.remove'),
		func: (evt: MouseEvent, idx: number, ctx: CtxListItem, gsTable: GsTable, data: VgtCtxEvent) => {
			if ( data.rowIndex === 0 ) {
				gsTable.rows.shift();
			} else {
				gsTable.rows.splice(data.rowIndex, 1);
			}
		},
	};

	private readonly addCellRight: CtxListItem = {
		name: this.$t('table.cell.add'),
		func: (evt: MouseEvent, idx: number, ctx: CtxListItem, gsTable: GsTable, data: VgtCtxEvent) => {
			console.log(data);
			const cell: VgtColumn = {
				field: 'field-' + Date.now(),
				label: '',
			};

			gsTable.cols.splice(data.colIndex + 1, 0, cell);
		},
	};

	private readonly delCell: CtxListItem = {
		name: this.$t('table.cell.remove'),
		func: (evt: MouseEvent, idx: number, ctx: CtxListItem, gsTable: GsTable, data: VgtCtxEvent) => {
			gsTable.cols.splice(data.colIndex, 1);
			if ( gsTable.cols.length === 0 ) {
				gsTable.removeTable.func(evt, idx, ctx, gsTable, data);
			}
		},
	};

	private readonly removeTable: CtxListItem = {
		name: this.$t('table.remove'),
		func: (evt: MouseEvent, idx: number, ctx: CtxListItem, gsTable: GsTable, data: VgtCtxEvent) => {
			gsTable.show = false;
		},
	};

	private sync(evt: Event, column: VgtColumn, row?: any) {
		const target: HTMLElement = evt.target as HTMLElement;
		if ( row ) {
			const idx = this.rows.findIndex((r: any) => r.id === row.id);
			if ( idx >= 0 ) {
				// TODO: Fix initialize cursor position bug, when input some text.
				this.rows[idx][column.field] = target.innerText;
			}
		} else {
			column.label = target.innerText;
		}
	}

	private showContextMenu(data: VgtCtxEvent) {
		this.ctx = [];

		this.ctx.push([]);
		this.ctx[0].push(this.addRowBottom);
		if ( data.rowIndex >= 0 ) {
			this.ctx[0].push(this.delRow);
		}

		this.ctx.push([]);
		this.ctx[1].push(this.addCellRight);
		this.ctx[1].push(this.delCell);

		this.ctx.push([]);
		this.ctx[2].push(this.removeTable);

		const ctx: ContextList = this.$refs.context as ContextList;
		ctx.open(data.event, this.ctx, this, data);
	}
}
</script>
