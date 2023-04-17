module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};
