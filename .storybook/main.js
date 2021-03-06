module.exports = {
  stories: ['../.stories/**/*.stories.mdx', '../.stories/**/*.stories.@(tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        controls: false,
      },
    },
    '@storybook/addon-a11y',
  ],
  babel: async (options) => ({
    ...options,
    plugins: ['istanbul', ...options.plugins],
  }),
};
