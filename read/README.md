# Deployment Information Action - read

This actions creates a JSON file containing all information to deploy an artifact to a platform, e.g. Cloud Foundry.

## Input parameters

`source-file`  
**Default:** `deploymentInfo.json`   
Specifies the filename of the json file.

`archive-path`  
**Default:** Empty string   
Specifies the directory where the deployment information json file is located. Trailing slash (`/`) is not supported.        

See also [action.yml](action.yml).

## Deployment Information JSON structure
This actions expects a deployment information JSON file with nahme `<source-filename>` in the director `<archive-path>`. 
The expected JSON structure looks as follows:

```json
{
  "artifactPath": "<artifact-path>",
  "manifestPath": "<manifest-path>"
}
```

## Output parameters
This parameters can be used in further steps of the workflow. The GitHub Actions documentation for [outputs](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/metadata-syntax-for-github-actions#outputs) 
describes the usage of output parameters.

`cf-manifest-path`  
Contains the path to the manifest file required to deploy to Cloud Foundry.

`artifact-path`  
Contains the path to the artifact to deploy.

See also [action.yml](action.yml).

## Example usage
```
...
- name: Read deploymentInfo.json
  id: deploymentInfo
  uses: comsysto/deployment-information-action/read@v1.0
  with:
    source-filename: <source-filename>
    archive-path: <archive-path>
...
```

A more complete example can be found in the [root README.md](../README.md).
