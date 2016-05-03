'use strict';

class BEMQuery {
	constructor( elements ) {
		this.elements = elements;

		this.converter = {
			getStateFromClass( className ) {
				return BEMQuery.state[ className ] || null;
			}
		};
	}
}

BEMQuery.state = {};

function factory( elements ) {
	return new BEMQuery( elements );
}

export { BEMQuery as BEMQuery };

export { factory as default };
