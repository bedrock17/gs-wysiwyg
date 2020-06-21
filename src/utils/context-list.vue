<template>
	<v-menu
		fixed
		:width="w"
		v-model="show"
		:position-x="x"
		:position-y="y"
		offset-y>
		<v-list dense>
			<div v-for="(con, idx) in ctx">
				<v-list-item
					v-for="c in con"
					@click="c.func($event, idx, con)"
					:key="c.name"
					style="font-size: 0.8rem; min-height:30px; padding-right:50px;">
					{{ c.name }}
				</v-list-item>
				<v-divider class="my-2" v-if="idx < ctx.length-1"></v-divider>
			</div>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

export interface CtxListItem {
	name: string;
	func(evt: MouseEvent, idx: number, con: CtxListItem);
}

@Component
export default class ContextList extends Vue {
	@Prop(String) private width!: string;
	@Prop(Array) private context!: any[];

	private x: number = 0;
	private y: number = 0;
	private w: string = this.width;
	private oriCtx: CtxListItem[][] = this.context;
	private ctx: CtxListItem[][] = this.oriCtx;
	private show: boolean = false;

	public open(evt: MouseEvent, ctxList?: CtxListItem[][]): any {
		this.x = evt.clientX;
		this.y = evt.clientY;
		this.show = true;

		if ( ctxList ) {
			this.ctx = ctxList;
		} else {
			this.ctx = this.oriCtx;
		}
		evt.preventDefault();
	}
}
</script>
