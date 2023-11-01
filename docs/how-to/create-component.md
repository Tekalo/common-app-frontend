# Creating a new Component

To create a new component do the following:

1. Copy the `templates/base` folder to the desired target folder (e.g. `components/utility/search`)

2. Rename each of the three files to the new component name (e.g. `BaseTemplate.tsx` --> `Search.tsx`)

3. Refactor the new component directory by replacing `BaseTemplate` with your component name in all three files

   > This can be achieved in VSCode by right-clicking the new directory and clicking "Find in Folder" and performing a search and replace of `BaseTemplate` with `YourComponent`. (e.g. `BaseTemplate` --> `Search`) There should be approximately 11 changes.

4. Validate each file has changed as expected and that the new component is available in storybook with `pnpm storybook`
