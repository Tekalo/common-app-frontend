# Infrastructure

## Why the project is setup this way

This is an opinionated [Next.js 13](https://nextjs.org/) project. This repository makes use of several presets and hooks to ensure code consistency.

Web development projects can quickly get out of hand in numerous ways. The configuration files below _should_ ensure that commit messages, code formatting, even style ordering are consistent across time, contributors, and projects.

The original author is also a perfectionist and inconsistency keeps him up at night.

## Technologies

This project makes use of the following primary technologies

### `Next.js 13.x`

[Next.js 13](https://nextjs.org/) is the latest react meta-framework and one of the gold-standards for modern webdev. It provides a highly performant, opinionated, and consistent way to build applications using React.

### `React 18.x`

[React](https://reactjs.org/) is one of the major javascript libraries for building user interfaces. It is popular, powerful, and highly-extensible.

### `Typescript 4.x`

[Typescript](https://www.typescriptlang.org/) is a type-safe (_as type-safe as javascript can be anyway_ 🤣) meta-language that approximates javascript and compiles down into it. This reduces the number of bugs you would normally encounter in javascript and introduces many others you'll become painfully familiar with.

### `TailwindCSS 3.x`

[Tailwind](https://tailwindcss.com/) is a utility framework around CSS that allegedly improves frontend development speed by using shorthand utility classes like `text-blue-500` to specify consistent inline CSS.

### `Auth0`

[Auth0](https://auth0.com) is one of the most popular Authentication as a Service providers on the market today. They give us all of the things you'd expect from an Auth provider. While pricier than other options we have opted into it generally for our projects to support the wide-variety of our applications and their possible user overlap.

### `pnpm`

This project expects you to use [pnpm](https://pnpm.io/) instead of npm or yarn. You can learn more on the website but, in short, this is done for performance reasons and to save disk space on whatever machine is running this and other projects.

### `Cloudflare Pages` & `Edge Workers`

This project is intended for deployment on [Cloudflare Pages](https://pages.cloudflare.com/) and where possible tries to make use of [Cloudflare Workers](https://workers.cloudflare.com/) to put some functionality on [the edge](https://vercel.com/docs/concepts/functions/edge-functions).

We chose Cloudflare over other "easier" options for performance and cost-savings. While services like [Vercel](https://vercel.com/) make deployment utterly painless, they can become quite expensive at scale. Cloudflare is more work to setup but grants much cheaper operation and higher performance around the world. If you want to though, this project can also be deployed to netlify or vercel with relative ease.

## Commit Linting

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
