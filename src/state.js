'use strict';

import { BEMQuery as BEMQuery } from 'bemquery-core';
import Batch from './batch';

/**
 * Method for getting states from all elements in collection
 *
 * @return {BEMQuery} Current BEMQuery instance.
 * @memberof BEMQuery
 */
BEMQuery.prototype.getStates = function() {
	if ( !this.batch ) {
		this.batch = new Batch();
	}

	this.batch.add( 'read', () => {
		const element = this.elements[ 0 ];
		const states = [];

		if ( !element ) {
			return [];
		}

		[].forEach.call( element.classList, ( className ) => {
			const state = this.selectorEngine.converter.getStateFromClass( String( className ) );

			if ( state ) {
				states.push( state );
			}
		} );

		return states;
	} );

	return this;
};
