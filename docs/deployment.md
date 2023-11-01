# Deployment

We have implemented github actions to automatically build, run tests, and deploy whenever a PR is created or merged into develop. When a PR is created, a build is deployed to a preview branch and a preview environment. You can find a link to this environment in a comment on the PR after it has been deployed.

When a PR is merged into develop (it should always be **squash-merged** into develop) it is automatically deployed to the `develop` environment.

Any created release can be deployed to staging and can have any tag format. This is good for testing hotfixes or release candidates before they go to staging. However, in the normal flow of things you will be creating a release candidate tag to deploy to staging. This will have the format `{semantic version number}-rc{candidate number}` eg: `1.2.0-rc1` would be the first release candidate for the release 1.2.0. For more information on sematic versioning and the scheme we are using to determine version bumps, you can check out [this article](https://betterprogramming.pub/better-versioning-for-frontend-applications-and-not-only-is-like-traffic-lights-for-engineers-380e9beb6a42). See below for specific instruction on creating release candidates.

To deploy to prod, you will need to create a full release. It will always need to have the format `${semantic version number}` eg: `1.2.0`.

For specific instructions on creating a full release, please see [General Deployment Process](./how-to/deployment-process.md).

## Deployment URLs

develop: <https://develop.common-app-frontend.pages.dev/>

staging: <https://staging.common-app-frontend.pages.dev/>

main: <https://main.common-app-frontend.pages.dev/> or <https://www.tekalo.org>

## Git Branching

The current git branching strategy expects three primary branches:

- main
- staging
- develop

All feature and WIP branches and work should be branched off of develop. All feature PRs should be squash-merged into develop. Staging and main will be subsets of develop depending on what is deployed to them. You should never commit or modify staging or main.
