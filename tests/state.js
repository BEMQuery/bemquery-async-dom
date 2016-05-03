/* global chai, fixture, sinon */

'use strict';

import { default as $, BEMQuery as BEMQuery } from 'bemquery-core';
import '../src/utils';
import '../src/state';

const expect = chai.expect;

describe( 'BEMQuery#getStates', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
		BEMQuery.state = {};
	} );

	it( 'is a function', () => {
		expect( BEMQuery.prototype.getStates ).to.be.a( 'function' );
	} );

	it( 'returns BEMQuery instance', () => {
		expect( $( [] ).getStates( 'state' ) ).to.be.instanceof( BEMQuery );
	} );

	it( 'calls internally converter\'s getStatetFromClass method', () => {
		fixture.load( 'elements.html' );

		const bemQuery = $( [ document.getElementById( 'state' ) ] );
		const spy = sinon.spy( bemQuery.converter, 'getStateFromClass' );
		BEMQuery.state[ 'block_simpleState' ] = 'simpleState';

		return bemQuery.getStates().read().then( () => {
			// One time for the block, one time for the modifier class.
			expect( spy ).to.have.been.calledTwice;
		} );
	} );

	it( 'gets simple state from the element', () => {
		fixture.load( 'elements.html' );

		const bemQuery = $( [ document.getElementById( 'state' ) ] );

		BEMQuery.state[ 'block_simpleState' ] = 'simpleState';

		return bemQuery.getStates().read().then( ( result ) => {
			expect( result[ 0 ] ).to.deep.equal( [ [ 'simpleState' ] ] );
		} );
	} );

	it( 'gets all states from the element with multiple states', () => {
		fixture.load( 'elements.html' );

		const bemQuery = $( [ document.getElementById( 'multipleStates' ) ] );

		BEMQuery.state[ 'block_state1' ] = 'state1';
		BEMQuery.state[ 'block_state2' ] = 'state2';

		return bemQuery.getStates().read().then( ( result ) => {
			expect( result[ 0 ] ).to.deep.equal( [ [ 'state1', 'state2' ] ] );
		} );
	} );

	it( 'returns empty array for the element without states', () => {
		fixture.load( 'elements.html' );

		const bemQuery = $( [ document.getElementById( 'nostate' ) ] );

		return bemQuery.getStates().read().then( ( result ) => {
			expect( result[ 0 ] ).to.deep.equal( [ [ ] ] );
		} );
	} );

	it( 'gets all states from all elements in the collection', () => {
		fixture.load( 'elements.html' );

		const bemQuery = $( [ ...document.querySelectorAll( '.block' ) ] );

		BEMQuery.state[ 'block_simpleState' ] = 'simpleState';
		BEMQuery.state[ 'block_state1' ] = 'state1';
		BEMQuery.state[ 'block_state2' ] = 'state2';

		return bemQuery.getStates().read().then( ( result ) => {
			expect( result[ 0 ] ).to.deep.equal( [
				[ 'simpleState' ],

				[],

				[ 'state1', 'state2' ]
			] );
		} );
	} );

	it( 'returns empty array for empty collection', () => {
		const bemQuery = $( [] );

		return bemQuery.getStates().read().then( ( result ) => {
			expect( result[ 0 ] ).to.deep.equal( [ ] );
		} );
	} );
} );
