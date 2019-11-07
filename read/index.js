const core = require( '@actions/core' );

// most @actions toolkit packages have async methods
async function run() {
    try {
        const archivePath = core.getInput( 'archive-path' );
        console.log( `Reading from ${ archivePath } ...` );
        fs.readFile( `${ archivePath }/deploymentInfo.json`, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            return JSON.parse( data );
        } );
    } catch (error) {
        core.setFailed( error.message );
    }
}

run().then( deploymentInfo => {
    core.setOutput( 'cf-manifest-path', deploymentInfo.manifestPath );
    core.setOutput( 'artifact-path', deploymentInfo.artifactPath );
} );
