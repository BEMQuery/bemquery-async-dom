'use strict';

import { BEMQuery as BEMQuery } from 'bemquery-core';
import Batch from './batch';

function processClasses( converter, element ) {
	const states = [];

	[].forEach.call( element.classList, ( className ) => {
		const state = converter.getStateFromClass( String( className ) );

		if ( state ) {
			states.push( state );
		}
	} );

	return states;
}

/**
 * Method for getting states from all elements in collection.
 *
 * @return {BEMQuery} Current BEMQuery instance.
 * @memberof BEMQuery
 */
BEMQuery.prototype.getStates = function() {
	if ( !this.batch ) {
		this.batch = new Batch();
	}

	const elements = this.elements;

	this.batch.add( 'read', () => {
		const result = [];

		elements.forEach( ( element ) => {
			result.push( processClasses( this.converter, element ) );
		} );

		return result;
	} );

	return this;
};
