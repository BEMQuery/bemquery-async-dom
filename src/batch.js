'use strict';

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

export default Batch;
