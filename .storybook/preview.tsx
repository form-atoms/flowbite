import "./style.css";
import { DevTools } from "jotai-devtools";
import React from "react";

import { ThemeInit } from "../.flowbite-react/init";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <DevTools />
      <Story />
    </>
  ),
  (Story) => (
    <>
      <ThemeInit />
      <Story />
    </>
  ),
];
