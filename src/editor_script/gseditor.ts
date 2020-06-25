/* Editor class

에디터의 구현 코드

*/

import {getRange, getFontBoldState, compareRangeContainer} from './browser';
import {Queue} from './queue';
import GlobalMixin from '@/plugins/mixin';
import marked from 'marked';

// custom editor components
import HtmlBox from '@/utils/html-box.vue';
import Table from '@/utils/table.vue';

const Mixin = new GlobalMixin();

interface ParseState {
	value: string;
	emitKey: string;
	queryString: string;
}

/*
interface Range {
	each(func: (r: Node, idx: number) => boolean);
}
*/

// TODO: How to add prototype function?
// @ts-ignore
Range.prototype.each = function(func: (r: Node, idx: number) => boolean) {
	const range = this;
	let sib: (Node | null) = range.startContainer;
	let i = 0;
	do {
		const result = func(sib, i++);

		if ( result === true ) {
			break;
		}

		sib = sib.nextSibling;
	} while ( sib && !compareRangeContainer(range, sib as HTMLElement) );
};

export class GSEditor {
	private brDiv!: HTMLElement;
	private editorDivTagElement: any;
	private ICC: any;
	// private lastKeyPos

	private parseList: ParseState[] =  [
		{ emitKey: 'cursor-bold', value: '', queryString: 'Bold'},
		{ emitKey: 'cursor-strike', value: '', queryString: 'strikethrough'},
		{ emitKey: 'cursor-italic', value: '', queryString: 'Italic'},
		{ emitKey: 'cursor-underline', value: '', queryString: 'Underline'},
		{ emitKey: 'text-front-color-change', value: '', queryString: 'foreColor'},
	];

	constructor(editorElement: any, icc: any) {
		this.brDiv = document.createElement('div');
		this.brDiv.innerHTML = '<br />';
		this.editorDivTagElement = editorElement;
		this.ICC = icc;
		this.initICC();
	}

	public getHTML(): string {
		return this.editorDivTagElement.innerHTML;
	}

	// 현재 상태를 파싱해서 툴바를 업데이트 한다.
	public updateToolbar(): void {
		const range = getRange();
		if (range === null) {
			return;
		}

		for (const i of this.parseList) {
			const value = document.queryCommandValue(i.queryString);

			// TODO
			// ICC로 보내주는 정보에 관한 문서 작성
			// 색상 선택시 등..
			if (i.value !== value) { //이전 정보와 다를 때만 툴바를 업데이트 한다.
				i.value = value;
				this.EmitICC(i.emitKey, i.value);
			}
		}
	}

	private EmitICC(method: string, ...args: any[]): void {
		this.ICC['toolbar-icc'].emit
			.apply(this.ICC['toolbar-icc'], [method].concat(args));
	}

	private initICC() {
		const hexToRgbString = (hex): string|null => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if (result == null) {
				return null;
			}

			const r = parseInt(result[1], 16).toString();
			const g = parseInt(result[2], 16).toString();
			const b = parseInt(result[3], 16).toString();

			return `rgba(${r},${g},${b},1)`;
		};

		const EICC = this.ICC['editor-icc'];

		EICC.on('erase', () => {
			// tslint:disable-next-line
			console.log("resive event erase");
		});

		EICC.on('undo', () => {
			// tslint:disable-next-line
			console.log("resive event undo");
		});

		EICC.on('redo', () => {
			// tslint:disable-next-line
			console.log("resive event redo");
		});

		EICC.on('change-align', (align: string) => {
			// tslint:disable-next-line
			console.log("resive event change-align", align);
		});


		EICC.on('text-front-color-change', (color: string) => {
			// tslint:disable-next-line
			console.log("resive event text-front-color-change", color);

			document.execCommand('foreColor', true, color);
		});

		EICC.on('text-back-color-change', (color: string) => {
			// tslint:disable-next-line
			console.log("resive event text-back-color-change", color);

			document.execCommand('backColor', true, color);
		});

		EICC.on('insert-picture', () => {
			// tslint:disable-next-line
			console.log("resive event insert-picture");
		});

		EICC.on('insert-table', () => {
			// tslint:disable-next-line
			console.log("resive event insert-table");

			this.editorDivTagElement.focus();
			const range = getRange();
			if ( range === null ) {
				return;
			}

			let target = range.commonAncestorContainer as HTMLElement;

			if ( target.className === this.editorDivTagElement.className) {
				target = document.createElement('div');
				this.editorDivTagElement.appendChild(target);
				this.editorDivTagElement.appendChild(this.brDiv);
			}


			const instance = Mixin.mount(Table, {
				propsData: { editable: true },
			}, target);
			const element = instance.$el as HTMLElement;
			if ( element.isContentEditable ) {
				element.setAttribute('contenteditable', 'false');
			}
		});

		EICC.on('insert-html', () => {
			// tslint:disable-next-line
			console.log("resive event insert-html");
			this.editorDivTagElement.focus();
			const range = getRange();
			if ( range === null ) {
				return;
			}

			let target = range.commonAncestorContainer as HTMLElement;

			if ( target.className === this.editorDivTagElement.className) {
				target = document.createElement('div');
				this.editorDivTagElement.appendChild(target);
				this.editorDivTagElement.appendChild(this.brDiv);
			}

			const instance = Mixin.mount(HtmlBox, {
				propsData: { editable: true },
			}, target);
			const element = instance.$el as HTMLElement;
			if ( element.isContentEditable ) {
				element.setAttribute('contenteditable', 'false');
			}
		});

		EICC.on('apply-markdown', () => {
			// tslint:disable-next-line
			console.log("resive event apply-markdown");

			this.editorDivTagElement.focus();
			const range = getRange();
			if ( range === null ) {
				return;
			}

			let allText = '';

			if ( this.isAllSelected(range as Range) ) {
				allText = this.editorDivTagElement.innerText.replace(/\n\n/g, '<br/>\n');
				const mdText = marked(allText);
				this.editorDivTagElement.innerHTML = mdText;
			} else {
				// @ts-ignore
				range.each((sib, idx) => {
					allText += sib.textContent + '\n<br/>';
				});

				const mdText = marked(allText);
				const mdSplitText = mdText.split('\n');
				// @ts-ignore
				range.each((sib, idx) => {
					if ( idx < mdSplitText.length ) {
						if ( sib.nodeName === '#text' ) {
							const div = document.createElement('div');
							div.innerHTML = mdSplitText[idx];
							if ( sib.previousSibling === null ) {
								this.editorDivTagElement.prepend(div);
								sib.remove();
							} else if ( sib.nextSibling ) {
								this.editorDivTagElement.insertBefore(div, sib.nextSibling);
							}
						} else {
							sib.innerHTML = mdSplitText[idx];
						}
					} else {
						sib.remove();
					}
				});
			}
		});

		EICC.on('code-block', (code: string) => {
			// tslint:disable-next-line
			console.log("resive event code-block", code);
		});

		EICC.on('tag-change', (tag: string) => {
			// tslint:disable-next-line
			console.log("resive event tag-change", tag);
		});

		EICC.on('font-change', (font: string) => {
			// tslint:disable-next-line
			console.log("resive event font-change", font);
		});

		EICC.on('size-change', (size: string) => {
			// tslint:disable-next-line
			console.log("resive event size-change", size);
		});

		EICC.on('toggle-bold', (bold: boolean) => {
			// tslint:disable-next-line
			document.execCommand('bold');
		});

		EICC.on('toggle-italic', (italic: boolean) => {
			// tslint:disable-next-line
			console.log("resive event toggle-italic", italic);
			document.execCommand('italic');
		});

		EICC.on('toggle-underline', (underline: boolean) => {
			// tslint:disable-next-line
			console.log("resive event toggle-underline", underline);
			document.execCommand('underline');
		});

		EICC.on('toggle-strike', (strike: boolean) => {
			// tslint:disable-next-line
			console.log("resive event toggle-strike", strike);
			document.execCommand('strikeThrough');
		});

		EICC.on('toggle-sub-super', (sub: boolean, sup: boolean) => {
			// tslint:disable-next-line
			console.log("resive event toggle-sub", sub, sup);
			document.execCommand('superscript');
		});

		EICC.on('add-link', (link: string) => {
			// tslint:disable-next-line
			console.log("resive event add-link", link);
		});

		EICC.on('del-link', () => {
			// tslint:disable-next-line
			console.log("resive event del-link");
		});

	}

	private isEditorElement(element: (HTMLElement | Node | ChildNode | Element)) {
		const htmlElement = element as HTMLElement;
		return htmlElement.className === this.editorDivTagElement.className;
	}

	private isAllSelected(range: Range) {
		if ( this.isEditorElement(range.startContainer) ) {
			return true;
		}

		return range.toString() === this.editorDivTagElement.innerText.replace(/\n/g, '');
	}

}
