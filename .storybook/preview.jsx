/** @type { import('@storybook/react').Preview } */
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { addDecorator } from "@storybook/react";

const queryClient = new QueryClient();

const withProviders = (Story) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

export const decorators = [withProviders];

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
export default preview;
