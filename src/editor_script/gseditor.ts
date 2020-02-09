
/* Editor class

에디터의 구현 코드

*/

import {Constant} from './constant';
import {getRange} from './browser';

export class GSEditor {

	private editorDivTagElement: any;
	private ICC: any;

	constructor(editorElement: any, icc: any) {
		this.editorDivTagElement = editorElement;
		this.ICC = icc;
	}

	public getHTML(): string {
		return this.editorDivTagElement.innerHTML;
	}

	public parse(): void {

		const range = getRange();
		if (range == null) {
			return;
		}

	}
}
