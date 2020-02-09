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
