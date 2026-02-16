/** @type {import('jest').Config} */
export default {
  preset: 'jest-preset-angular',

  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
        useESM: true,
      },
    ],
  },

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^package.json$': '<rootDir>/package.json',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },

  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  extensionsToTreatAsEsm: ['.ts'],
};