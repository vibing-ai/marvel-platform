import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure React 18 testing
configure({ testIdAttribute: 'data-testid', reactStrictMode: true });

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => 'Next Image Stub',
}));

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    };
  },
}));
