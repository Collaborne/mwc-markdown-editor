/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const json = require('es-dev-server-import-json');
const cjsTransformer = require('es-dev-commonjs-transformer');
const merge = require('deepmerge');

module.exports = config => {
  const defaultConfig = createDefaultConfig(config);
  config.set(
    merge(defaultConfig, {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: config.grep ? config.grep : 'dist/**/test/**/*.test.js', type: 'module' },
      ],

      esm: {
        plugins: [
          json(),
        ],
        responseTransformers: [
          cjsTransformer([
            ...defaultConfig.esm.babelModernExclude,
            '**/node_modules/@open-wc/**/*',
            '**/node_modules/chai/**/*',
            '**/node_modules/chai-dom/**/*',
            '**/node_modules/sinon-chai/**/*',
          ])
        ],
        nodeResolve: true,
      },

      coverageIstanbulReporter: {
        thresholds: {
          emitWarning: true,
        },
      },

      browserNoActivityTimeout: 60000,
    }),
  );
  return config;
};
