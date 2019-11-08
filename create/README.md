# Deployment Information Action - create

This actions creates a JSON file containing all information to deploy an artifact to a platform, e.g. Cloud Foundry.

## Input parameters

`artifact-base-name`    
Specifies the artifact base name without version. This parameter must not be empty.     

`artifact-version`  
Specifies the artifact version. This parameter must not be empty.     

`artifact-file-extension`  
Default: `jar`   
Specifies the artifact file extension.     

`archive-name`  
Default: Empty string   
Specifies the archive name.    

`target-path`   
Default: `./build/libs`     
Specifies the directory where the json file is created. Trailing slash (`/`) is not supported.

`target-filename`   
Default: `deploymentInfo.json`  
Specifies the filename of the created json file.    

See also [action.yml](action.yml).

## Output
As aforementioned this action creates a JSON file with the specified `target-filename`. The structure is as follows:

```json
{
  "artifactPath": "<archive-name>/<artifact-base-name>-<artifact-version>.<artifact-file-extension>",
  "manifestPath": "<archive-name>/manifest.yaml"
}
```

## Example usage
```
...
- name: Create deployment information
  uses: comsysto/deployment-information-action/create@v1.0
  with:
    artifact-base-name: <artifact-base-name>
    artifact-version: <artifact-version>
    artifact-file-extension: <artifact-file-extension>
    archive-name: <archive-name>
    target-path: <target-path>
    target-filename: <target-filename>
...
```

A more complete example can be found in the [root README.md](../README.md).
