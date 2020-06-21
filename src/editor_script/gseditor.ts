
/* Editor class

에디터의 구현 코드

*/

import {getRange, getFontBoldState} from './browser';
import {Queue} from './queue';

interface ParseState {
	tagName: string;
	value: boolean;
	emitKey: string;
	queryString: string;
}

export class GSEditor {

	private editorDivTagElement: any;
	private ICC: any;
	// private lastKeyPos

	constructor(editorElement: any, icc: any) {
		this.editorDivTagElement = editorElement;
		this.ICC = icc;
	}

	public getHTML(): string {
		return this.editorDivTagElement.innerHTML;
	}

	// 현재 상태를 파싱해서 툴바를 업데이트 한다.
	public updateToolbar(): void {
		const range = getRange();
		if (range == null) {
			return;
		}

		const parseList: ParseState[] =  [
			{ tagName: 'B', emitKey: 'cursor-bold', value: false, queryString: 'Bold'},
			{ tagName: 'STRIKE', emitKey: 'cursor-strike', value: false, queryString: 'strikethrough'},
			{ tagName: 'I', emitKey: 'cursor-italic', value: false, queryString: 'Italic'},
			{ tagName: 'U', emitKey: 'cursor-underline', value: false, queryString: 'Underline'},
			// { tagName: 'STRONG', emitKey: 'cursor-bold', value: false },
		];


		for (const i of parseList) {
			const qValue = document.queryCommandValue(i.queryString);

			if (qValue === 'true') {
				i.value = true;
			}
		}

		// TODO
		// ICC로 보내주는 정보에 관한 문서 작성
		// 색상 선택시 등..
		for (const i of parseList) {
			this.EmitICC(i.emitKey, i.value);
		}
	}

	private EmitICC(method: string, ...args: any[]): void {
		this.ICC['editor-icc'].emit
			.apply(this.ICC['editor-icc'], [method].concat(args));
	}


}
