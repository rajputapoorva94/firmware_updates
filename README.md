# Firmware Update Metadata API - Testing Repository
This project provides an API to automate firmware update management for multiple device types. The system will be designed to enable dynamic delivery of firmware download links and related information to client applications (such as an Android app) for seamless firmware updates.
Multiple repositories containing the firmware updates can be tracked on the basis of their versioning. The system will return the latest version available along with the release urls. The API will also provide a way to get all the releases associated with that particular repository.

## Initial Setup
 
### 1. Set up the tags and releases in the repositories containing the firmwares
Ensure that the tag name and release name must be the same.
Select the target branch , it must be the branch containing the workflow.
Upload the firmware update file for respective tag version
Eventually publish the release.
One release can hold multiple firmware files for different device types (e.g., drone,controller, sensor).
 ---
  ##2. Folder and File Types Explained :
 
-.github/workflows/  
  Contains workflow configuration files (like `update-firmware-json.yml`) for GitHub Actions. These files automate tasks such as updating firmware metadata when a new release is published.
 
- firmware-repo-main/docs/  
  Contains documentation or metadata files, such as `firmware.json`, which holds structured firmware information (e.g., firmware versions and devices).
 
- firmware-repo-main/testApi.js
  Contains application code for a test API server (in JavaScript), which likely serves firmware data from the generated `firmware.json` file for testing or development.
 
---
  
### 3. Workflow setup :
The workflow file must be present inside the root directory of the repository
 The workflow dynamically determines the tag name based on how it was triggered: if triggered by a release, it uses the release’s tag name (`github.ref_name`); if manually triggered, it uses the user-provided input (`github.event.inputs.tag_name`). 
This tag name is then saved to an environment variable (`TAG_NAME`) and used in subsequent steps for fetching release info and generating metadata
 The workflow YAML file must be inside the .github/workflows/ 
*GitHub Actions would not be able to detect the workflow if it is inside any other sub-directory.

### 4. GitHub Actions
Automatically run when a new release is published.
Generate a firmware.json file listing firmware version, filenames, and download URLs. This json file is created by the workflow in firmware-meta repository. The file is automatically updated with details of latest releases when a new release gets published in any repository.
  
### 5. Creating a Personal Access Token :
What is a GitHub PAT (Personal Access Token)?
A Personal Access Token (PAT) is like a password that allows scripts or GitHub Actions to securely access your GitHub account and perform actions like:
•	Pushing to a repository
•	Creating issues
•	Running workflows
 *The GitHub Action needs permission to push the firmware.json file to your firmware-meta repo. GitHub Actions can't do that by default unless you give it access via a token.

### Creating a GitHub Personal Access Token (PAT)

1. Go to **GitHub > Settings > Developer settings > Personal access tokens**.
2. Click **Generate new token**.
3. Set a name, expiration, and select required scopes (e.g., `repo`).
4. Click **Generate token** and copy the token.  
   (You won’t be able to see it again!)

### Adding a Personal Access Token as a Repository Secret
1. Go to your repository on GitHub.
2. Click **Settings**.
3. In the left sidebar, click **Secrets and variables** > **Actions**.
4. Click **New repository secret**.
5. Enter a **Name** for your secret (for example: `GITHUB_TOKEN`).
6. Paste your personal access token into the **Secret** field.
7. Click **Add secret** to save.
*You can now reference this secret in your GitHub Actions workflows using `secrets.SECRET_NAME`.
 


