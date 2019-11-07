const core = require( '@actions/core' );
const fs = require('fs');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const archivePath = core.getInput( 'archive-path' );
        console.log( `Reading from ${ archivePath } ...` );

        fs.readFile( `${ archivePath }/deploymentInfo.json`, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            let deploymentInfo = JSON.parse( data );
            core.setOutput( 'artifact-path', deploymentInfo.artifactPath );
            core.setOutput( 'cf-manifest-path', deploymentInfo.manifestPath );
        } );
    } catch (error) {
        core.setFailed( error.message );
    }
}

run();
