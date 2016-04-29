'use strict';

import { BEMQuery as BEMQuery } from 'bemquery-core';
import Batch from './batch';

/**
 * Method for getting/setting inner HTML of all elements in collection
 *
 * @param {String} [newHTML] The new inner HTML value. If not specified,
 * the method will work as getter.
 * @return {BEMQuery} Current BEMQuery instance.
 */
BEMQuery.prototype.html = function( newHTML ) {
	if ( !this.batch ) {
		this.batch = new Batch();
	}

	if ( typeof newHTML !== 'undefined' ) {
		newHTML = String( newHTML );

		this.batch.add( 'write', () => {
			const elements = this.elements;

			elements.forEach( ( element ) => {
				element.innerHTML = newHTML;
			} );
		} );
	} else {
		this.batch.add( 'read', () => {
			const elements = this.elements;
			const htmls = [];

			elements.forEach( ( element ) => {
				htmls.push( element.innerHTML );
			} );

			return htmls;
		} );
	}

	return this;
};
