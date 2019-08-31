const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  testEnvironment: 'jsdom',

  // dts-jest
  testRegex: [
    '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    '/__type_tests__/.+\\.type_test.ts$',
  ],
  transform: {
    '/__type_tests__/.+\\.type_test.ts$': 'dts-jest/transform',
    ...tsjPreset.transform,
  },
  globals: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    _dts_jest_: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      compiler_options: {
        strict: true,
      },
    },
  },
};
