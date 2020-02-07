<template>
	<div v-if="view">
		<v-menu width="150px"
			absolute
			v-model="showContext"
			:position-x="x"
			:position-y="y"
			offset-y>
			<v-list dense>
				<div v-for="(con, idx) in context">
					<v-list-item
						v-for="c in con"
						@click="c.func"
						:key="c.name"
						style="font-size: 0.8rem; min-height:30px; padding-right:50px;">
						{{ c.name }}
					</v-list-item>
					<v-divider class="my-2" v-if="idx < context.length-1"></v-divider>
				</div>
			</v-list>
		</v-menu>
		<table
			class="gs-custom-table"
			@contextmenu.prevent="toggleContext"
			@mousedown.left="tableDragStart"
			@mouseup.left="tableDragEnd"
			@mouseover.left="tableDragOver">
			<tbody>
				<tr v-for="(row, ridx) in table">
					<td
						v-for="(col, cidx) in row"
						v-if="col.view"
						:class="col.selected ? 'selected' : ''"
						:width="(1 / row.length * 100) * (col.colspan > 0 ? col.colspan : 1) + '%'"
						:data-row="ridx"
						:data-cell="cidx"
						:contenteditable="contenteditable"
						:colspan="col.colspan > 0 ? col.colspan : ''"
						:rowspan="col.rowspan > 0 ? col.rowspan : ''"
						:data-tmp="log(col, ridx, cidx)"
						@input="tdInput"
						v-html="col.content">
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
table.gs-custom-table {
	width: 100%;
}

table.gs-custom-table,
table.gs-custom-table td,
table.gs-custom-table td[contenteditable]:focus {
	border: 1px solid #dadada;
	border-collapse: collapse;
	min-width: 100px;
	outline: 0px solid transparent;
	word-break: break-all;
}
table.gs-custom-table
	tr td {
	padding: 13px 25px;
	-webkit-touch-callout:	none;
	-webkit-user-select:	none;
	-khtml-user-select:		none;
	-moz-user-select:		none;
	-ms-user-select:		none;
	user-select:			none;
}

table.gs-custom-table
	tr td.selected {
	background-color: rgba(194, 240, 198, 0.5);
}
</style>

<script lang="ts">
import Vue from 'vue';
import Lang from '../languages/Lang';

const getTablePos = function(td: any) {
	const pos = {
		cell: 0,
		row: 0,
	};

	if ( td && typeof td.cellIndex === 'number' ) {
		if ( td.dataset.cell ) {
			pos.cell = td.dataset.cell;
		} else {
			pos.cell = td.cellIndex;
		}

		if ( td.dataset.row ) {
			pos.row = td.dataset.row;
		} else {
			const tr = td.parentElement;
			if ( tr && typeof tr.rowIndex === 'number' ) {
				pos.row = tr.rowIndex;
			}
		}
	}
	return pos;
};

const getTableMap = function(tbody: any) {
	const table = Array();
	let maxCell = 0;

	const rows = tbody.querySelectorAll('tr');
	rows.forEach((tr: HTMLElement) => {
		const cells = Array.prototype.slice.call(tr.querySelectorAll('td'));
		if ( cells.length > maxCell ) {
			maxCell = cells.length;
		}
		table.push(cells);
	});

	return {
		table,
		pos: {
			row: rows.length - 1,
			cell: maxCell - 1,
		},
	};
};

const setSelectTable = function(table: any, pos1: any, pos2: any, select: boolean) {
	const selected: any = [];
	let startRowIdx, thresholdRowIdx,
		startCellIdx, thresholdCellIdx;

	if ( pos1.row > pos2.row ) {
		startRowIdx = pos2.row;
		thresholdRowIdx = pos1.row;
	} else {
		startRowIdx = pos1.row;
		thresholdRowIdx = pos2.row;
	}

	if ( pos1.cell > pos2.cell ) {
		startCellIdx = pos2.cell;
		thresholdCellIdx = pos1.cell;
	} else {
		startCellIdx = pos1.cell;
		thresholdCellIdx = pos2.cell;
	}

	for ( let row = startRowIdx; row <= thresholdRowIdx; row++ ) {
		const tr = table[row];
		for ( let cell = startCellIdx; cell <= thresholdCellIdx; cell++ ) {
			const td = tr[cell];
			td.selected = select;
			selected.push(td);
		}
	}

	return selected;
};

const tableDragStart = function(this: any, evt: MouseEvent) {
	const s = evt.target;
	this.selectedTable = [];
	setSelectTable(this.table, { cell: 0, row: 0 }, this.tablePos, false);

	this.mouseDown = true;

	this.start = getTablePos(s);
	this.start.el = s;
};

const tableDragOver = function(this: any, evt: MouseEvent) {
	if ( this.mouseDown === true ) {
		const cur = evt.target as HTMLElement;
		if ( cur && cur.tagName === 'TD' ) {
			const curPos = getTablePos(cur);
			const startPos = this.start;

			setSelectTable(this.table, { cell: 0, row: 0 }, this.tablePos, false);
			this.selectedTable = setSelectTable(this.table, curPos, startPos, true);
		}

	}
};

const tableDragEnd = function(this: any, evt: MouseEvent) {
	this.mouseDown = false;
	const e = evt.target;
	this.end = getTablePos(e);
	this.end.el = e;
};

const dumyFunc = function(this: any, evt: MouseEvent) {
	console.log(this, evt);
};

const toggleContext = function(this: any, evt: MouseEvent) {
	const target = evt.target as HTMLElement;
	const pos = {
		cell: target.dataset.cell,
		row: target.dataset.row,
	};

	if ( this.selectedTable.length === 0 ) {
		this.selectedTable = setSelectTable(this.table, pos, pos, true);
	}

	this.showContext = true;
	this.x = evt.clientX;
	this.y = evt.clientY;
	this.contextCell = {
		el: target,
		cell: pos.cell,
		row: pos.row,
	};
};


export default Vue.extend({
	name: 'GsTable',
	methods: {
		tableDragStart,
		tableDragOver,
		tableDragEnd,
		toggleContext,
		log: console.log,
		tdInput(this: any, evt: Event) {
			const target = evt.target as HTMLElement;
			const row = target.dataset.row as string;
			const cell = target.dataset.cell as string;

			const ridx = parseInt(row, 10) as number;
			const cidx = parseInt(cell, 10) as number;
			const table = this.table as object[];

			if ( this.table && Array.isArray(this.table) ) {
				this.table[ridx][cidx].bak = target.innerHTML;
			}
		},
	},
	updated() {
		this.$nextTick(() => {
			this.table.forEach((row: any) => {
				row.forEach((col: any) => {
					if ( typeof col.bak === 'string' ) {
						col.content = col.bak;
					}
				});
			});
		});
	},
	mounted() {
		// empty
	},
	// tslint:disable-next-line
	data: function(this: any) {
		return {
			view: true,
			mouseDown: false,
			start: null,
			end: null,
			table: [
				[
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
				],
				[
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
				],
				[
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
					{ content: '', selected: false, colspan: 0, rowspan: 0, view: true },
				],
			],
			tablePos: { cell: 2, row: 2 },
			selectedTable: [],
			contenteditable: true,
			showContext: false,
			x: 0,
			y: 0,
			contextCell: {},
			context: [
				[
					{
						name: Lang('table.row.add'),
						func: () => {
							const cell = this.contextCell;
							const newTable = Array();
							const rows = this.table;

							const cellLen = this.tablePos.cell + 1;
							const newCell = Array();
							for ( let i = 0; i < cellLen; i++ ) {
								newCell.push({ content: '', selected: false, colspan: 0, rowspan: 0, view: true });
							}


							const targetRow = parseInt(cell.row, 10);
							rows.forEach((row: any, ridx: number) => {
								newTable.push(row);
								if ( ridx === targetRow ) {
									newTable.push(newCell);
									console.dir(newTable);
								}
							});
							this.table = newTable;
						},
					},
					{
						name: Lang('table.row.remove'),
						func: () => {
							const cell = this.contextCell;
							const newTable = Array();
							const rows = this.table;
							const targetRow = parseInt(cell.row, 10);

							rows.forEach((row: any, ridx: number) => {
								if ( ridx !== targetRow ) {
									newTable.push(row);
								}
							});
							this.table = newTable;
						},
					},
					{
						name: Lang('table.cell.add'),
						func: () => {
							const cell = this.contextCell;
							const rows = this.table;
							const newTable = Array();

							const targetCol = parseInt(cell.cell, 10);
							rows.forEach((row: any, ridx: number) => {
								const newRow = Array();
								row.forEach((col: any, cidx: number) => {
									newRow.push(col);
									if ( cidx === targetCol ) {
										newRow.push({ content: '', selected: false, colspan: 0, rowspan: 0, view: true });
									}
								});
								newTable.push(newRow);
							});
							this.table = newTable;
						},
					},
					{
						name: Lang('table.cell.remove'),
						func: () => {
							const cell = this.contextCell;
							const rows = this.table;
							const newTable = Array();
							const targetCol = parseInt(cell.cell, 10);

							rows.forEach((row: any, ridx: number) => {
								const newRow = Array();
								row.forEach((col: any, cidx: number) => {
									if ( cidx !== targetCol ) {
										newRow.push(col);
									}
								});
								newTable.push(newRow);
							});
							this.table = newTable;
						},
					},
				],
				[
					{
						name: Lang('table.cell.merge'),
						func: () => {
							const selStart = this.start;
							const selEnd = this.end;

							const mergeStart = Object();
							const mergeEnd = Object();

							if ( selStart.cell < selEnd.cell ) {
								mergeStart.cell = parseInt(selStart.cell, 10);
								mergeEnd.cell = parseInt(selEnd.cell, 10);
							} else {
								mergeStart.cell = parseInt(selEnd.cell, 10);
								mergeEnd.cell = parseInt(selStart.cell, 10);
							}

							if ( selStart.row < selEnd.row ) {
								mergeStart.row = parseInt(selStart.row, 10);
								mergeEnd.row = parseInt(selEnd.row, 10);
							} else {
								mergeStart.row = parseInt(selEnd.row, 10);
								mergeEnd.row = parseInt(selStart.row, 10);
							}

							const rows = this.table;
							for (let ridx = mergeStart.row; ridx <= mergeEnd.row; ridx++ ) {
								for (let cidx = mergeStart.cell; cidx <= mergeEnd.cell; cidx++ ) {
									if ( ridx === mergeStart.row && cidx === mergeStart.cell ) {
										rows[ridx][cidx].rowspan = mergeEnd.row - mergeStart.row + 1;
										rows[ridx][cidx].colspan = mergeEnd.cell - mergeStart.cell + 1;
									} else {
										rows[ridx][cidx].view = false;
									}
								}
							}

							this.table = rows;
						},
					},
					{
						name: Lang('table.cell.unmerge'),
						func: () => {
							const selStart = this.start;
							const selEnd = this.end;

							const mergeStart = Object();
							const mergeEnd = Object();

							if ( selStart.cell < selEnd.cell ) {
								mergeStart.cell = parseInt(selStart.cell, 10);
								mergeEnd.cell = parseInt(selEnd.cell, 10);
							} else {
								mergeStart.cell = parseInt(selEnd.cell, 10);
								mergeEnd.cell = parseInt(selStart.cell, 10);
							}

							if ( selStart.row < selEnd.row ) {
								mergeStart.row = parseInt(selStart.row, 10);
								mergeEnd.row = parseInt(selEnd.row, 10);
							} else {
								mergeStart.row = parseInt(selEnd.row, 10);
								mergeEnd.row = parseInt(selStart.row, 10);
							}

							const rows = this.table;
							for (let ridx = mergeStart.row; ridx <= mergeEnd.row; ridx++ ) {
								const row = rows[ridx];
								for (let cidx = mergeStart.cell; cidx <= mergeEnd.cell; cidx++ ) {
									const cell = row[cidx];

									let r = 0, c = 0;
									const thresholdR = cell.rowspan, thresholdC = cell.colspan;
									do {
										do {
											const R = rows[ridx + r];
											const C = R;

											C[cidx + c].view = true;
										} while (++c < thresholdC);
								 	} while (++r < thresholdR);

									cell.colspan = 0;
									cell.rowspan = 0;
								}
							}
						},
					},
				],
				[
					{
						name: Lang('table.remove'),
						func: () => {
							this.view = false;
						},
					},
				],
			],
		};
	},
});
</script>
