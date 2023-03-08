# Common App Frontend

This repository contains the code to run the Common App Next.js frontend application. This README provides useful information concerning development, deployment, and project structure.

## Getting Started

### Pre-Requisites

- Install [nvm](https://github.com/nvm-sh/nvm)
- Install [pnpm](https://pnpm.io/)

### Starting development

1. Clone the repository and `cd` into it
2. Run `nvm install lts/gallium` to install the proper node-engine
3. Run `nvm use` to switch to it in your current environment
4. Make a copy of the .env file: `cp .env.sample .env.local`
5. Upate the values in your `.env.local` file according to the TODOs
6. Run `pnpm install` to download necessary dependencies
7. Run `pnpm dev` and the application should be live on `localhost:3000` and ready for development!

## Project Organization

Configuration folders and files are at the root of the project and everything concerning the actual app is contained in the `src` directory.

In general, this project conforms to standard Next.js project structure. We do not currently make use of the experimental App directory that Next.js 13 provides.

### `components`

Contains all re-usable components that can be dropped into a page.

To create a new component do the following:

1. Copy the `templates/base` folder to the desired component folder (e.g. `utility/search`)

2. Rename each of the three files to the new component name (e.g. `BaseTemplate.tsx` --> `Search.tsx`)

3. Refactor the new component directory by replacing `BaseTemplate` with your component name in all three files

   > This can be achieved in VSCode by right-clicking the new directory and clicking "Find in Folder" and performing a search and replace of `BaseTemplate` with `YourComponent`. (e.g. `BaseTemplate` --> `Search`) There should be approximately 17 changes.

4. Inside of the new component story file, update the title with the new location appropriately (e.g. '`templates/BaseTemplate` --> `utility/Search`)

### `lib`

This for shared infrastructure across the application. You can think of it literally as a library to store business logic, reusable routes, and anything else that multiple pages or components might need to use.

### `pages`

Next.js expects a certain structure in the project. Namely, we make use of [Next.js pages](https://nextjs.org/docs/basic-features/pages) which are react components that have a 1-1 correspondence with the URL route. For example a page located at `src/pages/about.tsx` would be rendered at the url `{baseURL}/about` (e.g. `localhost:3000/about`).

### `pages/api`

This is a special folder in Next.js that allows us to have a frontend proxy api. Files in here are compiled into a Cloudflare worker and must, at the moment, contain the edge runtime flag to deploy properly.

```javascript
export const config = {
  runtime: 'edge',
};
```

### `styles`

Since we are using tailwind, you won't have to mess around in here very much. Tailwind expects styles to be applied in-line on the component or pages themselves.

## Infrastructure & Deployment

### Git Branching

The current git branching strategy expects three primary branches:

- main
- staging
- develop

All feature and WIP branches and work should be branched off of develop. Develop should be the only branch to merge into staging. Staging should be the only branch to merge into main.

### Deployment

We have implemented github actions to automatically build and deploy when commits are pushed to specific branches. Specifically, the following deployment paths are in place:

- merges into `main` trigger a production deployment

- merges into `staging` trigger a preview deployment

- merges into any branch with the naming pattern `test/*` trigger a preview deployment

  - This is especially useful when testing features that rely on the edge-runtime as functional local implementations may not function properly when deployed to cloudflare. Let's walk through an example:
    - Pretend you're working on a branch `feat/some-new-widget` and think it is ready to merge into `develop` but want to make sure it will work properly on cloudflare.
    - You can create a new branch off of your feature branch with `git branch -b test/some-new-widget` and push it to github.
    - **This will trigger an isolated preview deployment for that specific branch**.
    - If things are working as you expect, great! Prune/remove the test branch and proceed to PR. Otherwise, you can use this test branch to diagnose issues with your implementation

### Commit Linting

This project makes use of [commitlint](https://commitlint.js.org/#/) to ensure consistent commit messages. You can look at `commitlint.config.js` if you're curious about setup. All commit messages need to be of the form:

`{type} {100-char max commit message}`

for example...

`feat: Implemented the widget click`

The "type" can be any of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, - formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

## Miscellaneous

### Why the project is setup this way

This is an opinionated [Next.js 13](https://nextjs.org/) project. This repository makes use of several presets and hooks to ensure code consistency.

Web development projects can quickly get out of hand in numerous ways. The configuration files below _should_ ensure that commit messages, code formatting, even style ordering are consistent across time, contributors, and projects.

The original author is also a perfectionist and inconsistency keeps him up at night.

### Technologies

This project makes use of the following primary technologies

#### `Next.js 13.x`

[Next.js 13](https://nextjs.org/) is the latest react meta-framework and one of the gold-standards for modern webdev. It provides a highly performant, opinionated, and consistent way to build applications using React.

#### `React 18.x`

[React](https://reactjs.org/) is one of the major javascript libraries for building user interfaces. It is popular, powerful, and highly-extensible.

#### `Typescript 4.x`

[Typescript](https://www.typescriptlang.org/) is a typesafe (_as typesafe as javascript can be anyway_ 🤣) meta-language that approximates javascript and compiles down into it. This reduces the number of bugs you would normally encounter in javascript and introduces many others you'll become painfully familiar with.

#### `TailwindCSS 3.x`

[Tailwind](https://tailwindcss.com/) is a utility framework around CSS that allegedly improves frontend development speed by using shorthand utility classes like `text-blue-500` to specify consistent inline CSS.

#### `Auth0`

[Auth0](https://auth0.com) is one of the most popular Authentication as a Service providers on the market today. They give us all of the things you'd expect from an Auth provider. While pricier than other options we have opted into it generally for our projects to support the wide-variety of our applications and their possible user overalp.

#### `pnpm`

This project expects you to use [pnpm](https://pnpm.io/) instead of npm or yarn. You can learn more on the website but, in short, this is done for performance reasons and to save disk space on whatever machine is running this and other projects.

#### `Cloudflare Pages` & `Edge Workers`

This project is intended for deployment on [Cloudflare Pages](https://pages.cloudflare.com/) and where possible tries to make use of [Cloudflare Workers](https://workers.cloudflare.com/) to put some functionality on [the edge](https://vercel.com/docs/concepts/functions/edge-functions).

We chose Cloudflare over other "easier" options for performance and cost-savings. Whiele services like [Vercel](https://vercel.com/) make deployment utterly painless, they can become quite expensive at scale. Cloudflare is more work to setup but grants much cheaper operation and higher performance around the world. If you want to though, this project can also be deployed to netlify or vercel with relative ease.

---

## Configuration Details

The following information seeks to explain the use of various configuration files for ease of maintenance and learning. The hope here is that a maintainer will be able to understand what each file is for and where to change things when necessary.

### Folders & Files Explained

#### `.github/workflows`

This folder contains github workflows that execute when code is pushed to github.

#### `.husky`

[Husky](https://github.com/typicode/husky) is used to enforce coding standards through scripts that are run under specific conditions. Currently we have three pre-commit hooks that execute in the following order:

1. `pre-commit` runs our `lint-staged` command prettifying staged files
2. `commit-msg` enforces standardized commit messages using [CommitLint](https://commitlint.js.org/#/) and will reject non-standard commits.
3. `pre-push` validates that pushed code successfully builds by running a local build using the `pnpm build:for-edge` command

#### `.next` && `.vercel`

These folders are generated as part of the `next-on-pages` build process.

#### `.vscode`

This contains project specific vscode overrides. Specifically we specify `launch.json` which allows for consistent debugging and `settings.json` that ensures default behavior in vscode for this project.

#### `next.config.js`

[next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) lets you apply various settings for Nextjs.

#### `.env*`

For the use and storage of environment variables used throughout the app, especially during authorization.

#### `postcss.config.js` & `tailwind.config.js`

These files help map and apply tailwind css to vanilla css during builds. The tailwind config in particular is adjusted to match the design spec for this application so things like `text-blue-500` are mutually understood between designers and developers

#### `tsconfig.json`

This file allows you to configure the typescript compiler. Various settings are toggled in this file and before adding, changing, or copying settings from anywhere you should read the docs on that setting.

#### `package.json`

This is your general project configuration file that lists dependencies, scripts available and various other settings like engine-locking.

#### `.eslintrc.json`

Configures eslint to behave in the way we expect throughout the application.

#### `.linstagedrc.js`

This file configures how the lint-staged program functions. Essentially, it runs `next lint --fix` on files that are currently git staged and skips the rest. The eslintrc.json file allows eslint and prettier to play nicely together so this all works as you hope.

#### `.npmrc`

The [npm config file](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc) allows us to configure npm (or pnpm in our case). We are setting our engine-strict to true to ensure all development occurs on the same node engines.

#### `.nvmrc`

Similar to the .npmrc file, this specifies the node-version the application **must** be run on.

#### `.prettierignore` & `.prettierrc.json`

These files configure what prettier ignores and how prettier chooses to function.

#### `.commitlint.config.js`

This configures how commitlint behaves. All of the rules (at present) are copied from config-conventional and available for clarity.

#### `pnpm-lock.yaml`

This file is generated by pnpm and is equivalent to the regular lock files used in yarn or npm.
