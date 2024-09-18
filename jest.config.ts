import { Config } from 'jest';

const config: Config = {
  preset: '@stencil/core/testing',
  testRunner: 'jest-jasmine2',
  //setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageReporters: ['cobertura', 'json', 'lcov', 'clover', 'text'],
  globals: {
    'ts-jest': {
      diagnostics: true,
    }
  }
};
module.exports = config;

