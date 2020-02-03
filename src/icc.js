const busKey = 'gs-wysiwyg-event-bus';

class Icc {
	constructor() {
		this.evList = new Object();
	}

	on(key, func) {
		if ( typeof func === 'function' ) {
			if ( typeof this.evList == 'object' ) {
				this.evList[key.toString()] = func;
			}
		}
	}

	emit(key, ...argv) {
		if ( typeof this.evList === 'object' ) {
			if ( this.evList[key] ) {
				return this.evList[key].apply(this, argv);
			}
		}
	}
};

const iccBus = {
	'toolbar-icc': new Icc(),
	'editor-icc': new Icc(),
};

if ( window ) {
	if ( !window[busKey+'-t'] ) {
		window[busKey+'-t'] = iccBus['toolbar-icc'];
	}
	if ( !window[busKey+'-e'] ) {
		window[busKey+'-e'] = iccBus['editor-icc'];
	}
}

export default iccBus;
