/* global chai, sinon */

'use strict';

import Batch from '../src/batch';

const expect = chai.expect;

describe( 'Batch#add', () => {
	it( 'is a method', () => {
		const batch = new Batch();

		expect( batch.add ).to.be.a( 'function' );
	} );

	it( 'requires \'read\' or \'write\' as a 1. parameter', () => {
		const batch = new Batch();

		expect( () => {
			batch.add( 'hublabubla', null );
		} ).to.throw( TypeError, 'Type must be either \'read\' or \'write\'.' );
	} );

	it( 'requires function as a 2. parameter', () => {
		const batch = new Batch();

		expect( () => {
			batch.add( 'read', 1 );
		} ).to.throw( TypeError, 'Task must be a function.' );
	} );

	it( 'runs tasks from batch only with specified type', () => {
		const batch = new Batch();
		const spy = sinon.spy( window, 'requestAnimationFrame' );

		batch.add( 'read', () => {
			return 1;
		} );

		batch.add( 'write', () => {} );

		return batch.run( 'write' ).then( () => {
			expect( batch.write ).to.have.lengthOf( 0 );
			expect( batch.read ).to.have.lengthOf( 1 );
			expect( spy ).to.have.been.called.once;

			spy.restore();
		} );
	} );
} );
