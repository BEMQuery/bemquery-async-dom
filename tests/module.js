/* global chai */

'use strict';

import { BEMQuery as BEMQuery } from 'bemquery-core';
import '../src/index';

const expect = chai.expect;

describe( 'BEMQuery', () => {
	it( 'has read method', () => {
		expect( BEMQuery.prototype.read ).to.be.a( 'function' );
	} );

	it( 'has write method', () => {
		expect( BEMQuery.prototype.write ).to.be.a( 'function' );
	} );

	it( 'has getStates method', () => {
		expect( BEMQuery.prototype.getStates ).to.be.a( 'function' );
	} );

	it( 'has html method', () => {
		expect( BEMQuery.prototype.html ).to.be.a( 'function' );
	} );
} );
