/*! bemquery-async-dom v0.1.4 | (c) 2016 BEMQuery team | MIT license (see LICENSE) */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('bemquery-core')) :
	typeof define === 'function' && define.amd ? define(['bemquery-core'], factory) :
	(factory(global.bemquery));
}(this, (function (bemqueryCore) { 'use strict';

/** Class storing queue of DOM operations. */
class Batch {
	/**
	 * Constructing new batch.
	 *
	 * @class
	 */
	constructor() {
		this.read = [];
		this.write = [];
	}

	/**
	 * Add new operation to the batch.
	 *
	 * @param {String} type Type of operation. Must be either "read" or "write".
	 * @param {Function} fn Operation to be fired.
	 * @return {BEMQuery} Current BEMQuery instance.
	 */
	add( type, fn ) {

		if ( type !== 'read' && type !== 'write' ) {
			throw new TypeError( 'Type must be either \'read\' or \'write\'.' );
		}

		if ( typeof fn !== 'function' ) {
			throw new TypeError( 'Task must be a function.' );
		}

		this[ type ].push( fn );
	}

	/**
	 * Run operations of given type.
	 *
	 * @param {String} type Type of operations to run. Must be either "read" or "write".
	 * @return {Promise} Promise that will be fulfilled after running all tasks.
	 */
	run( type = 'read' ) {
		if ( type !== 'read' && type !== 'write' ) {
			throw new TypeError( 'Type must be either \'read\' or \'write\'.' );
		}

		return new Promise( ( resolve ) => {
			requestAnimationFrame( () => {
				const results = [];

				this[ type ].forEach( ( fn ) => {
					results.push( fn() );
				} );

				this[ type ] = [];

				return resolve( results );
			} );
		} );
	}
}

/**
 * Method that runs all read operations stored in batch
 *
 * @return {Promise} Promise returned by batch.
 * @memberof BEMQuery
 */
bemqueryCore.BEMQuery.prototype.read = function() {
	if ( !this.batch ) {
		this.batch = new Batch();
	}

	return this.batch.run( 'read' );
};

/**
 * Method that runs all write operations stored in batch
 *
 * @return {Promise} Promise returned by batch.
 * @memberof BEMQuery
 */
bemqueryCore.BEMQuery.prototype.write = function() {
	if ( !this.batch ) {
		this.batch = new Batch();
	}

	return this.batch.run( 'write' );
};

/**
 * Method for getting/setting inner HTML of all elements in collection
 *
 * @param {String} [newHTML] The new inner HTML value. If not specified,
 * the method will work as getter.
 * @return {BEMQuery} Current BEMQuery instance.
 * @memberof BEMQuery
 */
bemqueryCore.BEMQuery.prototype.html = function( newHTML ) {
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
bemqueryCore.BEMQuery.prototype.getStates = function() {
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

/** @class BEMQuery */

})));
//# sourceMappingURL=bemquery-async-dom.umd.js.map
