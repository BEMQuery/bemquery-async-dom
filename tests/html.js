/* global chai, fixture */

'use strict';

import { default as $, BEMQuery as BEMQuery } from 'bemquery-core';
import '../src/utils';
import '../src/html';

const expect = chai.expect;

describe( 'BEMQuery#html', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
	} );

	it( 'is a function', () => {
		expect( BEMQuery.prototype.html ).to.be.a( 'function' );
	} );

	it( 'returns BEMQuery instance', () => {
		const result = $( [] ).html();

		expect( result ).to.be.instanceof( BEMQuery );
	} );

	it( 'gets inner HTML for the all elements in the collection when no parameters are provided', () => {
		const bemQuery = $( [ ...document.querySelectorAll( '.block' ) ] );

		return bemQuery.html().read().then( ( values ) => {
			const htmls = values[ 0 ];

			htmls.forEach( ( html, i ) => {
				expect( html ).to.be.equal( bemQuery.elements[ i ].innerHTML );
			} );
		} );
	} );

	it( 'sets inner HTML for all elements in the collection when parameter is provided', () => {
		const bemQuery = $( [ ...document.querySelectorAll( '.block' ) ] );
		const expectedHTML = 'Testy test';

		return bemQuery.html( expectedHTML ).write().then( () => {
			bemQuery.elements.forEach( ( element ) => {
				expect( element.innerHTML ).to.equal( expectedHTML );
			} );
		} );
	} );

	it( 'returns empty array for empty collection', () => {
		const bemQuery = $( [] );

		return bemQuery.html().read().then( ( values ) => {
			const htmls = values[ 0 ];

			expect( htmls ).to.deep.equal( [] );
		} );
	} );
} );
