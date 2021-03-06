const process = require('process');
const cp = require('child_process');
const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process.env['INPUT_ARTIFACT-BASE-NAME'] = "application-base-name";
    process.env['INPUT_ARTIFACT-FILE-EXTENSION'] = "jar";
    process.env['INPUT_ARTIFACT-VERSION'] = "1.0.0";
    process.env['INPUT_ARCHIVE-NAME'] = "deploymentArchive";
    process.env['INPUT_TARGET-PATH'] = "./test/build";
    process.env['INPUT_TARGET-FILENAME'] = "deploymentInfo.json";

    const ip = path.join(__dirname, 'index.js');
    console.log(cp.execSync(`node ${ip}`).toString());
})
