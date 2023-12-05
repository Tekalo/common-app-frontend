# General Deployment Process

## 1. Creating a Release Candidate

1. Make sure all the changes you'd like to push are squash-merged to develop
1. On the main page of the repo, click [Tags -> Releases](https://github.com/tekalo/common-app-frontend/releases)
1. Click [Draft a New Release](https://github.com/tekalo/common-app-frontend/releases/new)
1. Click the dropdown that says "Choose tag" and create a new tag iterating off of last one created
   - If you need a reference on version numbers, please see [this article](https://betterprogramming.pub/better-versioning-for-frontend-applications-and-not-only-is-like-traffic-lights-for-engineers-380e9beb6a42)
   - Bump the version number accordingly with the changes to be deployed and add the suffix `-rc1` to the end
     - If this is not the first release candidate for this set of changes, or you are adding more changes to the release, you should bump the rc number accordingly `-rc2`, `-rc3` etc
   - You should have something that looks like `1.2.0-rc1`
1. Click "Create new tag on publish" at the bottom of the tags dropdown
1. Make sure your target is set to the correct commit. It will be the latest commit in develop by default
1. Set the title as `Release - {YYYY/MM/DD}` eg: `Release - 2023/09/05` so we can see when this set of changes is to be pushed
1. Next to "Generate release notes" set "Previous Tag" to the last full release and click "Generate release notes"
1. Set the release to be a pre-release by checking the box at the bottom fo the form
1. Click publish release

## 2. Deploy Release Candidate to Staging

1. At the top of github, select "Actions"
1. In the Actions list on the left-side click "Deploy Project to Staging"
1. On the right side of the screen, click "Run workflow"
1. Set the branch to "develop" and enter the tag number in the tag input eg: `1.2.0-rc1`
   - Make sure there are no additional spaces in the tag name as it can cause problems
1. Click 'Run workflow"
   - This will deploy that release to the staging environment
1. Wait for the changes to be deployed and check to make sure all of the tests pass in the workflow
1. Test your changes in staging once deployed

## 3. Creating a Full Release

1. Find the release candidate you made in the first step and edit it
1. Create a new tag with just the sematic version number, omitting the `-rc1` section at the end
1. Select "Create new tag on publish"
1. Uncheck "Set as a pre-release" at the bottom
1. Check "Set as the latest release" at the bottom
1. Click "Update release"

## 4. Deploy Full Release to Prod

1. Once your full release has been created and you've verified that your changes are ready to be pushed to production click "Actions"
1. Select "Deploy Project to Prod" on the right side
1. Select "Run workflow" on the right side
1. Set the branch to develop and the tag to be the tag of the full release you created eg: `1.2.0`
1. Click "Run workflow"
   - This will deploy your changes to production
1. Wait for the changes to be deployed and check to make sure all of the tests pass in the workflow
1. Test your changes in production once deployed
