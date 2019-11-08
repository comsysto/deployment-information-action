const core = require( '@actions/core' );
const exec = require( '@actions/exec' );
const fs = require('fs');

// most @actions toolkit packages have async methods
async function run() {
    try {
        let archiveName = core.getInput('archive-name');
        let targetPath = core.getInput('target-path');
        let targetFilename = core.getInput('target-filename');

        core.info(`Creating ${targetFilename}...`);

        // Retrieve artifact information via gradle
        core.info('Retrieve artifact information from gradle...');
        let output = '';
        let error = '';
        const options = {};
        options.listeners = {
            stdout: (data) => {
                output += data.toString();
            },
            stderr: (data) => {
                error += data.toString();
            }
        };
        await exec.exec(
            './gradlew properties -q '|' grep \'^archivesBaseName:\' '|' awk \'{print $2}\'',
            undefined,
            options);
        core.debug(error)
        let archivesBaseName = output;

        output = '';
        error = '';
        await exec.exec(
            './gradlew properties  -q | grep \'^version:\' | awk \'{print $2}\'',
            undefined,
            options);
        core.debug(error)
        let version = output;

        // Create file content
        let fileContent = {};
        fileContent.artifactPath = `${archiveName}/${archivesBaseName}-${version}.jar`;
        fileContent.manifestPath = `${archiveName}/manifest.yaml`;

        let fileContentJson = JSON.stringify(fileContent, undefined, 2);
        core.debug(fileContentJson);

        core.info('Create json file in target path...');
        // Create directory
        fs.mkdir(targetPath, { recursive: true }, (err) => {
            if (err) throw err;
        });

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
