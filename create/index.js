const core = require( '@actions/core' );
const fs = require('fs');
const process = require('process');

function checkingRequiredParameters(artifactBaseName, artifactVersion) {
    core.info(`Checking inputs...`);
    if (artifactBaseName == null) {
        core.setFailed('Artifact base name must be defined.')
        process.exit(1);
    }

    if (artifactVersion == null) {
        core.setFailed('Artifact version must be defined.')
        process.exit(1);
    }
}

function createFileContentJson(archiveName, artifactBaseName, artifactFileExtension, artifactVersion, targetPath) {
    let fileContent = {};
    fileContent.artifactPath = `${archiveName}/${artifactBaseName}-${artifactVersion}.${artifactFileExtension}`;
    fileContent.manifestPath = `${archiveName}/manifest.yaml`;

    let fileContentJson = JSON.stringify(fileContent, undefined, 2);
    core.debug(fileContentJson);

    core.info('Create json file in target path...');
    // Create directory
    fs.mkdir(targetPath, {recursive: true}, (err) => {
        if (err) throw err;
    });

    return fileContentJson;
}

// most @actions toolkit packages have async methods
async function run() {
    try {
        let artifactBaseName = core.getInput('artifact-base-name');
        let artifactFileExtension = core.getInput('artifact-file-extension');
        let artifactVersion = core.getInput('artifact-version');
        let archiveName = core.getInput('archive-name');
        let targetPath = core.getInput('target-path');
        let targetFilename = core.getInput('target-filename');
        core.info(artifactBaseName)
        core.info(artifactVersion)

        checkingRequiredParameters(artifactBaseName, artifactVersion);

        core.info(`Creating ${targetFilename}...`);
        core.info('Using following input information:');
        core.info(`Artifact base name: ${artifactBaseName}`);
        core.info(`Artifact version: ${artifactVersion}`);
        core.info(`Archive name: ${archiveName}`);
        core.info(`Target path: ${targetPath}`);
        core.info(`Target filename: ${targetFilename}`);

        // Create file content
        let fileContentJson = createFileContentJson(archiveName, artifactBaseName, artifactFileExtension, artifactVersion, targetPath);

        // Create deployment information json file
        fs.writeFile(`${targetPath}/${targetFilename}`, fileContentJson, (err) => {
            if (err) {
                throw err;
            }
        });
    } catch (error) {
        core.setFailed( error.message );
    }
}

run();
