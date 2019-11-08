const core = require('@actions/core');
const fs = require('fs');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const sourceFilename = core.getInput('source-filename');
        const archivePath = core.getInput('archive-path');

        core.info('Using following input information:');
        core.info(`Source filename: ${sourceFilename}`);
        core.info(`Archive path: ${archivePath}`);

        console.log(`Reading from ${archivePath} ...`);
        fs.readFile(`${archivePath}/${sourceFilename}`, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            let deploymentInfo = JSON.parse(data);
            core.setOutput('artifact-path', deploymentInfo.artifactPath);
            core.setOutput('cf-manifest-path', deploymentInfo.manifestPath);
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
