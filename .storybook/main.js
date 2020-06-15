const common = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const cjsTransformer = require('es-dev-commonjs-transformer');
const esDevJson = require('es-dev-server-import-json');

module.exports = {
  stories: ['../stories/**/*.stories.{js,md,mdx}'],
  addons: [	
    'storybook-prebuilt/addon-knobs/register.js',	
    'storybook-prebuilt/addon-docs/register.js',	
    'storybook-prebuilt/addon-viewport/register.js',
  ],
  esDevServer: {
    nodeResolve: true,
    watch: true,
    open: true,
    plugins: [
      esDevJson(),
    ],
    responseTransformers: [
      cjsTransformer([
        '**/node_modules/@open-wc/**/*',
      ]),
    ],
  },

  rollup: config => ({
    ...config,
    plugins: [
      ...config.plugins,
      json(),
      common(),
    ],
  }),
};
