module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  setupFiles: ['<rootDir>/__setup__/env-setup.js'],
};
