'use strict';

const cwd = process.cwd();
const config = {};

config[ `${cwd}/tests/html.js` ] = config[ `${cwd}/tests/state.js` ] =
config[ `${cwd}/tests/utils.js` ] = config[ `${cwd}/tests/module.js` ] = {
		'bemquery-core': `${cwd}/tests/support/mocks/bemquery-core.js`
};

module.exports = config;
