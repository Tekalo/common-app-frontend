import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const BREAKPOINTS_INT = {
  xs: 320,
  sm: 360,
  md: 768,
  lg: 1280,
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    console.log(val);
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

const preview: Preview = {
  parameters: {
    // Notifies Chromatic to pause the animations when they finish for the specific story.
    backgrounds: {
      default: 'light',
    },
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: { viewports: customViewports },
  },
};

export default preview;
