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
			let rtn = null;
			if ( this.evList['*:before'] ) {
				this.evList['*:before'].apply(this, [key].concat(argv));
			}

			if ( this.evList[key] ) {
				rtn = this.evList[key].apply(this, argv);
			}

			if ( this.evList['*:after'] ) {
				this.evList['*:after'].apply(this, [key].concat(argv));
			}
			return rtn;
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
