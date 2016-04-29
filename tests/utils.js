/* global chai */

'use strict';

import { default as $, BEMQuery as BEMQuery } from 'bemquery-core';
import '../src/utils';

const expect = chai.expect;

describe( 'BEMQuery#read', () => {
	it( 'is a function', () => {
		expect( BEMQuery.prototype.read ).to.be.a( 'function' );
	} );

	it( 'returns promise', () => {
		expect( $( [] ).read() ).to.be.instanceof( Promise );
	} );
} );

describe( 'BEMQuery#write', () => {
	it( 'is a function', () => {
		expect( BEMQuery.prototype.write ).to.be.a( 'function' );
	} );

	it( 'returns promise', () => {
		expect( $( [] ).write() ).to.be.instanceof( Promise );
	} );
} );
