
/* Editor class

에디터의 구현 코드

*/

import {getRange} from './browser';
import {Queue} from './queue';

interface ParseState {
	tagName: string;
	value: boolean;
	emitKey: string;
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
			{ tagName: 'B', emitKey: 'cursor-bold', value: false },
			{ tagName: 'STRIKE', emitKey: 'cursor-strike', value: false },
			{ tagName: 'I', emitKey: 'cursor-italic', value: false },
			{ tagName: 'U', emitKey: 'cursor-underline', value: false },
			// { tagName: 'STRONG', emitKey: 'cursor-bold', value: false },
		];

		const q = new Queue();
		q.enqueue(range.startContainer.parentElement);

		while (q.length > 0) {
			const element = q.dequeue();

			for (const i of parseList) {
				if (i.tagName === element.tagName) {
					i.value = true;
				}
			}

			if (element === this.editorDivTagElement) {
				// 에디터 탐색이 끝난경우
				break;
			}
			const parent = element.parentElement;
			if (parent == null) {
				// 타입상 예외처리, 일반적으로 실행될 상황은 없음
				break;
			}

			q.enqueue(parent);
		}

		// ICC로 Toolbar를 업데이트 시켜줘야함
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
