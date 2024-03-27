import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        controls: false,
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  async babel(config) {
    let babelConfig = config ?? {};
    return { ...babelConfig, plugins: ['istanbul', ...(babelConfig?.plugins ?? [])] };
  },
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../.stories/**/*.mdx', '../.stories/**/*.stories.@(tsx)'],
};

export default config;
