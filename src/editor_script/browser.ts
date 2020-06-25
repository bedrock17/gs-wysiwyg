/*
	브라우저의 의존성을 가지는 기능들
*/

export const getSelection = (): Selection|null => {
	return window.getSelection();
};

export const getRange = (): Range| null => {
	const sel: Selection|null = window.getSelection();
	if (sel == null) {
		return null;
	}
	return sel.getRangeAt(0);
};

export const getFontBoldState = (): string => {
	return document.queryCommandValue('Bold');
	// return document.queryCommandValue("ForeColor");
};

export const compareRangeContainer = (r: Range, element: HTMLElement) => {
	const range = r.cloneRange();
	range.setStart(element as Node, 0);
	return range.collapsed;
};
