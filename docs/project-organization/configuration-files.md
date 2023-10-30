# Configuration Details

The following information seeks to explain the use of various configuration files for ease of maintenance and learning. The hope here is that a maintainer will be able to understand what each file is for and where to change things when necessary.

## Folders & Files Explained

### `.babelrc`

To enable instrumenting the code, we need to use the [babeljs](https://babeljs.io/docs/) typescript compiler. Specifically, we are using the [babel next preset](https://www.npmjs.com/package/babel-preset-next) package. The main project uses the default SWC compiler, but has poor support for code instrumentation.

Because this is the case, we need to enable babel whenever we run anything testing related. This is done by renaming the `_bablerc` in the root directory to `.babelrc`. This is done automatically with a shell script located at `cypress/scripts/setup-test-env.sh` and called in the `scripts` section of `package.json`. This renames the file before the tests are run and moves them back when the testing command exits.

### `.github/workflows`

This folder contains github workflows that execute when code is pushed to github.

### `.husky`

[Husky](https://github.com/typicode/husky) is used to enforce coding standards through scripts that are run under specific conditions. Currently we have three pre-commit hooks that execute in the following order:

1. `pre-commit` runs our `lint-staged` command prettifying staged files
2. `commit-msg` enforces standardized commit messages using [CommitLint](https://commitlint.js.org/#/) and will reject non-standard commits.
3. `pre-push` validates that pushed code successfully builds by running a local build using the `pnpm build:for-edge` command

   - Note: If you encounter an issue in the `pre-push` command that resembles the error below, make sure pnpm is added as a `devDependency` in package.json. It seems that cloudflare has intermittent problems finding pnpm if is isn't explicitly listed as a dependency in the project.

     ```bash
         C:\Users\...\...\project>npx @cloudflare/next-on-pages
         @cloudflare/next-to-pages CLI
         ⚡️
         ⚡️ Installing 'vercel' CLI...
         ⚡️
         node:events:368
               throw er; // Unhandled 'error' event
               ^

         Error: spawn npm ENOENT
             at Process.ChildProcess._handle.onexit (node:internal/child_process:282:19)
             at onErrorNT (node:internal/child_process:477:16)
             at processTicksAndRejections (node:internal/process/task_queues:83:21)
         Emitted 'error' event on ChildProcess instance at:
             at Process.ChildProcess._handle.onexit (node:internal/child_process:288:12)
             at onErrorNT (node:internal/child_process:477:16)
             at processTicksAndRejections (node:internal/process/task_queues:83:21) {
           errno: -4058,
           code: 'ENOENT',
           syscall: 'spawn npm',
           path: 'npm',
           spawnargs: [ 'install', '-D', 'vercel' ]
         }
     ```

### `.next` && `.vercel`

These folders are generated as part of the `next-on-pages` build process.

### `.vscode`

This contains project specific vscode overrides. Specifically we specify `launch.json` which allows for consistent debugging and `settings.json` that ensures default behavior in vscode for this project.

### `next.config.js`

[next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) lets you apply various settings for Nextjs.

### `.env*`

For the use and storage of environment variables used throughout the app, especially during authorization.

### `postcss.config.js` & `tailwind.config.js`

These files help map and apply tailwind css to vanilla css during builds. The tailwind config in particular is adjusted to match the design spec for this application so things like `text-blue-500` are mutually understood between designers and developers

### `tsconfig.json`

This file allows you to configure the typescript compiler. Various settings are toggled in this file and before adding, changing, or copying settings from anywhere you should read the docs on that setting.

### `package.json`

This is your general project configuration file that lists dependencies, scripts available and various other settings like engine-locking.

### `.eslintrc.json`

Configures eslint to behave in the way we expect throughout the application.

### `.linstagedrc.js`

This file configures how the lint-staged program functions. Essentially, it runs `next lint --fix` on files that are currently git staged and skips the rest. The eslintrc.json file allows eslint and prettier to play nicely together so this all works as you hope.

### `.npmrc`

The [npm config file](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc) allows us to configure npm (or pnpm in our case). We are setting our engine-strict to true to ensure all development occurs on the same node engines.

### `.nvmrc`

Similar to the .npmrc file, this specifies the node-version the application **must** be run on.

### `.prettierignore` & `.prettierrc.json`

These files configure what prettier ignores and how prettier chooses to function.

### `.commitlint.config.js`

This configures how commitlint behaves. All of the rules (at present) are copied from config-conventional and available for clarity.

### `pnpm-lock.yaml`

This file is generated by pnpm and is equivalent to the regular lock files used in yarn or npm.
