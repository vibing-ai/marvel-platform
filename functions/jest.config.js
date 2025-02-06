module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    '**/*.js',
    '!jest.config.js',
    '!node_modules/**',
    '!coverage/**',
    '!docs/**'
  ],
  setupFilesAfterEnv: ['./test/setup/jest.setup.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testTimeout: 10000
};
