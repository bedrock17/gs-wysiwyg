
/* Editor class

에디터의 구현 코드

*/

export class GSEditor {
	public editorDivTagElement: any;

	constructor(editorElement: any) {
		this.editorDivTagElement = editorElement;
	}

	public getHTML(): string {
		return this.editorDivTagElement.innerHTML;
	}
}
