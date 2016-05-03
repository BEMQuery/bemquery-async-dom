require( 'bemquery-selector-engine/package.json' );
require( 'bemquery-core/package.json' );
require( 'bemquery-async-dom/package.json' );

var fs = require( 'fs' ),
    url = require( 'url' ),
	endpoint = 'https://tonicdev.io' + process.env.TONIC_ENDPOINT_PATH;

exports.tonicEndpoint = function( request, response ) {
    const package = url.parse( request.url, true ).query.package;

	response.end( fs.readFileSync( require.resolve( 'bemquery-' + package ) ) );
};



`<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Tonic Example</title>
		</head>
		<body>
			<p>Example</p>

            <script src="${endpoint}?package=selector-engine"></script>
            script src="${endpoint}?package=core"></script>
            script src="${endpoint}?package=async-dom"></script>
			<script>
				const bemQuery = bemquery.default( 'block element' );

				bemQuery.html().getStates().read().then( ( values ) => {
					const html = values[ 0 ][ 0 ];
					const states = values[ 1 ];

					console.log( html ); // Test
					console.log( states ); // [ 'state1', 'state2' ]
				} );
			</script>
		</body>
	</html>`;
