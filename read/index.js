const core = require('@actions/core');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const archivePath = core.getInput('archive-path');
    console.log(`Reading from ${archivePath} ...`)


    JSON.parse()
    core.setOutput('cf-manifest-path', "fghfhg");
    core.setOutput('artifact-path', "sdfgsdfs");
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
