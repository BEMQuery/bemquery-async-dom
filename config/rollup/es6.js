import nodeResolve from 'rollup-plugin-node-resolve';
import convertCJS from 'rollup-plugin-commonjs';

const packageInfo = require( '../../package.json' );

export default {
	entry: 'src/index.js',
	format: 'es6',
	external: [
		'bemquery-core'
	],
	globals: {
		'bemquery-core': 'bemquery'
	},
	sourceMap: true,
	plugins: [ nodeResolve(), convertCJS() ],
	banner: `/*! BEMQuery v${packageInfo.version} | (c) ${new Date().getFullYear()} BEMQuery | MIT license (see LICENSE) */`,
	dest: 'dist/bemquery-async-dom.js'
};
