const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: ['<rootDir>/src'],
  transform: tsjPreset.transform,
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  globalSetup: './src/config/jest/globalSetup.ts',
  globalTeardown: './src/config/jest/globalTeardown.ts'
};
