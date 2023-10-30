# `src` folder structure

## `lang`

Holds all of the text strings for the application, broken up by page or section they are displayed on. Currently, the only language is `en` but with a little work, you could localize the site using this structure.

## `lib`

This for shared infrastructure across the application. You can think of it literally as a library to store business logic, reusable routes, and anything else that multiple pages or components might need to use.

- ### `constants`

  This holds all of the constants that are used across the site.

  - `selects` - All of the lists of options that are used in the different inputs for the forms. These are built and configured in this file.
  - `strings` - Any strings that aren't used for display but are cookie keys or important strings that are used in multiple places.
  - `svgs` - All of the SVGs used across the site are barrelled and exported here

- ### `helpers`

  Any utility function that is used in multiple places.

  [//]: # 'TODO: Rename to `requests` or something similar'

  - `apiHelpers` - Functions that are used to make network requests. All of these requests pass through the BFF first, headers are added, and are forwarded to the API.

  [//]: # 'TODO: refactor to individual function types'

  - `formHelpers` - Holds utility functions that are used across the forms

- ### `layouts`

  Any reusable layouts are stored here. These are high-level layouts that include navigation, footer, and content wrappers. [NextJS Layouts](https://nextjs.org/docs/basic-features/layouts) allow for precise re-rendering while preserving the layout of a particular page or components shared across pages.

- ### `providers`

  Holds all of the providers for the site. Providers are like singleton services that hold state and provide related functionality to multiple pages on the site.

- ### `schemas`

  All of the zod schemas are configured here. We use [Zod](https://github.com/colinhacks/zod) as a way to gain Typescript types and validate our form inputs.

  - `clientSchemas` are the schemas directly used by the front-end to validate form data and extract types from
  - `apiSchemas` holds the schemas that the API accepts. Due to value transformation these differ from `clientSchemas`

- ### `templates`

  These are basic structures for layouts and components that can be used to create new components. For details on creating a new component see the [Creating a new Component](../how-to/create-component.md) section.

- ### `types/globals.d.ts`

  This holds any additional global types that need to be added for typescript to recognize them. Currently we only use this to define functions and properties on the `window` object so they can be referenced in the app.

- ### `enums.ts`

  [//]: # 'TODO: This is more like validators and should be renamed/refactored'

  This holds all of the enum values that are used across the site as well as their validators.

- ### `imageLoader.ts`

  [//]: # 'TODO: Ask Seth about this'

  The function used to optimize image loading in cloudflare

- ### `types.ts`

  [//]: # 'TODO: needs to be refactored'

  The types that we use across the site

## `modules`

- ### `components`

  Contains all re-usable components that can be dropped into a page and are organized by type. For details on creating a new component see the [Creating a new Component](../how-to/create-component.md) section.

- ### `sections`

  Contains sections which can be considered compound components. These are usually single use and mostly in place as an organizational tool. They provide no functional benefit save for code isolation.

## `pages`

Holds the top-level pages and determines the routes for the application.

Next.js expects a certain structure in the project. Namely, we make use of [Next.js pages](https://nextjs.org/docs/basic-features/pages) which are react components that have a 1-1 correspondence with the URL route. For example a page located at `src/pages/about.tsx` would be rendered at the url `{baseURL}/about` (e.g. `localhost:3000/about`).

- `_app` holds the main, top-level application code, all the service wrappers, and all of the providers.
- `_document` holds all of the stuff that you would expect at the root file of any website. This includes:

  - Custom scripts that need to be loaded quickly and early (google tag manager, window-level scripts like cookie consent functions, etc)
  - Page header attributes
  - Fonts
  - The Next.js `Main` component that loads `_app`

The rest of the pages are just named pages that are either one-offs, or organized by sections in the site.

## `pages/api`

This is a special folder in Next.js that allows us to have a frontend proxy api. Files in here are compiled into a Cloudflare worker and must, at the moment, contain the edge runtime flag to deploy properly.

```javascript
export const config = {
  runtime: 'edge',
};
```

## `styles`

Since we are using tailwind, you won't have to mess around in here very much. Tailwind expects styles to be applied in-line on the component or pages themselves. Currently this folder contains:

- `globals.css` that references tailwind and ports some custom fonts into the tailwind project.
- `phone-number-input.css` which is a modified library css file. We are using a custom phone number input library and needed to tweak the styles. We did that in here.
