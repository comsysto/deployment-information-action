# Deployment Information Action

A GitHub JavaScript action to create, read and parse deployment information provided as JSON file.

## Structure
The repository is separated into two actions:

* [create](create/README.md)
* [read](read/README.md)

Both actions uses the same JSON structure.

## Example usage

```
name: Couldfoundry CI Lab
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Set up JDK 11
      uses: actions/setup-java@v1
      with:
        java-version: 11
    - name: Build with Gradle
      run: ./gradlew clean build
    - name: Copy manifest.yaml
      run: cp ./manifest.yaml <archive-path>
    - name: Retrieve artifact information from gradle
      id: artifact-information
      run: |
        archivesBaseName="$(./gradlew properties -q | grep '^archivesBaseName:' | awk '{print $2}')"
        version="$(./gradlew properties  -q | grep '^version:' | awk '{print $2}')"

        echo "::set-output name=artifact-base-name::${archivesBaseName}"
        echo "::set-output name=artifact-version::${version}"
    - name: Create deployment information
      uses: comsysto/deployment-information-action/create@v1.0
      with:
        artifact-base-name: ${{ steps.artifact-information.outputs.artifact-base-name }}
        artifact-version: ${{ steps.artifact-information.outputs.artifact-version }}
        archive-name: <archive-name>
        target-path: <archive-path>
    - name: Upload deploymentArchive
      uses: actions/upload-artifact@v1
      with:
        name: <archive-name>
        path: <archive-path>
  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v1
        with:
          name: <archive-name>
      - name: Read deploymentInfo.json
        id: deploymentInfo
        uses: comsysto/deployment-information-action/read@v1.0
        with:
          archive-path: <archive-name>
      - name: cf push
        uses: comsysto/cloudfoundry-action/cli@v1.0
        with:
          args: push -f ${{ steps.deploymentInfo.outputs.cf-manifest-path }} -p ${{ steps.deploymentInfo.outputs.artifact-path }} --no-start

```
In case of building an artifact using Gradle the `<archive-path>` could be `build/libs`.

## Projects that uses the the Deployment Information action

* https://github.com/comsysto/github-action-lab

## Sources:

* [Official workflow documentation](https://help.github.com/en/actions/automating-your-workflow-with-github-actions)

* [How to create a new repository based on a template](https://github.blog/2019-06-06-generate-new-repositories-with-repository-templates/)

* [How to build a JavaScript action](https://github.com/actions/javascript-action)
