/*
 * hotkey.ts
 * Created on Mon Jun 29 2020
 *
 * Copyright (c) Tree-Some. Licensed under the MIT License.
 */
import ICC from '@/icc';

const EmitICC = (method: string, ...args: any[]) => {
	ICC['editor-icc'].emit
		.apply(ICC['editor-icc'], [method].concat(args));
};

export interface GSKeyStruct {
	key: string;
	ctrlKey?: boolean;
	shiftKey?: boolean;
	altKey?: boolean;
	metaKey?: boolean;
}

export interface HotKeyStructs {
	[key: string]: GSKeyStruct;
}

const keys: HotKeyStructs = {
	'apply-markdown': {
		key: 'm',
		ctrlKey: true,
	},
};

export class GSHotKey {
	constructor(element: HTMLElement, k?: any) {
		if ( typeof k === 'object' ) {
			for ( const [key, val] of Object.entries(k) ) {
				if ( keys[key] ) {
					keys[key] = val as GSKeyStruct;
				}
			}
		}

		element.addEventListener('keydown', this.keyDownEvent);
	}

	private keyDownEvent(evt: KeyboardEvent) {
		for ( const [key, val] of Object.entries(keys) ) {
			if ( val.key     === evt.key      &&
				( val.ctrlKey  === undefined || val.ctrlKey  === evt.ctrlKey  ) &&
				( val.altKey   === undefined || val.altKey   === evt.altKey   ) &&
				( val.metaKey  === undefined || val.metaKey  === evt.metaKey  ) &&
				( val.shiftKey === undefined || val.shiftKey === evt.shiftKey ) ) {
				EmitICC(key, evt);
				evt.preventDefault();
				break;
			}
		}
	}
}
