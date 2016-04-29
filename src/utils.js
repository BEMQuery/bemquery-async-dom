'use strict';

import { BEMQuery as BEMQuery } from 'bemquery-core';
import Batch from './batch';

/**
 * Method that runs all read operations stored in batch
 *
 * @return {Promise} Promise returned by batch.
 * @memberof BEMQuery
 */
BEMQuery.prototype.read = function() {
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
BEMQuery.prototype.write = function() {
	if ( !this.batch ) {
		this.batch = new Batch();
	}

	return this.batch.run( 'write' );
};
