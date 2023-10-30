# Getting Started

## Pre-Requisites

- Install [nvm](https://github.com/nvm-sh/nvm)
- Install [pnpm](https://pnpm.io/)

## Starting development

[//]: # 'TODO: we should update this section to describe all the different vars in the .env file'

1. Clone the repository and `cd` into it
2. Run `nvm install lts/gallium` to install the proper node-engine
3. Run `nvm use` to switch to it in your current environment
4. Make a copy of the .env file: `cp .env.sample .env.local`
5. Update the values in your `.env.local` file according to the TODOs
6. Run `pnpm install` to download necessary dependencies
7. Run `pnpm dev` and the application should be live on `localhost:3000` and ready for development!
