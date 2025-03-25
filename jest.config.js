module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'], // Ensure the setup file is correctly loaded
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': [
        'babel-jest',
        {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      ],
    },
  };
  