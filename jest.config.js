module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|webp|ico|bmp|tiff)$':
      '<rootDir>/__mocks__/fileMock.js',
    '@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  setupFiles: ['<rootDir>/__setup__/env-setup.js'],
};
