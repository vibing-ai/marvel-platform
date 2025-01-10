import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { AuthContext } from './libs/providers/GlobalProvider';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import axios from 'axios';

// Mock dependencies
jest.mock('axios');
jest.mock('react-google-recaptcha-v3', () => ({ useGoogleReCaptcha: jest.fn() }));
jest.mock('@/assets/svg/googleIcon.svg', () => 'svg-mock');

describe('GoogleSignInButton', () => {
  const mockHandleOpenSnackBar = jest.fn();
  const mockHandleGoogleLogin = jest.fn();
  const mockExecuteRecaptcha = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    useGoogleReCaptcha.mockReturnValue({ executeRecaptcha: mockExecuteRecaptcha });
  });

  it('renders correctly', () => {
    render(
      <AuthContext.Provider value={{ handleOpenSnackBar: mockHandleOpenSnackBar, handleGoogleLogin: mockHandleGoogleLogin }}>
        <GoogleSignInButton isSignIn={true} />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Sign In Via Google')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls handleGoogleLogin when reCAPTCHA is successful', async () => {
    // Simulate reCAPTCHA success
    mockExecuteRecaptcha.mockResolvedValue('fake-recaptcha-token');
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <AuthContext.Provider value={{ handleOpenSnackBar: mockHandleOpenSnackBar, handleGoogleLogin: mockHandleGoogleLogin }}>
        <GoogleSignInButton isSignIn={true} />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockHandleGoogleLogin).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('/api/verify-recaptcha', { gRecaptchaToken: 'fake-recaptcha-token' });
  });

  it('shows error message when reCAPTCHA verification fails', async () => {
    // Simulate reCAPTCHA failure
    mockExecuteRecaptcha.mockResolvedValue('fake-recaptcha-token');
    axios.post.mockResolvedValue({ data: { success: false } });

    render(
      <AuthContext.Provider value={{ handleOpenSnackBar: mockHandleOpenSnackBar, handleGoogleLogin: mockHandleGoogleLogin }}>
        <GoogleSignInButton isSignIn={true} />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockHandleOpenSnackBar).toHaveBeenCalledWith('error', 'Failed reCAPTCHA verification.'));
  });

  it('handles error during reCAPTCHA execution', async () => {
    // Simulate reCAPTCHA failure during execution
    mockExecuteRecaptcha.mockRejectedValue(new Error('reCAPTCHA execution failed'));

    render(
      <AuthContext.Provider value={{ handleOpenSnackBar: mockHandleOpenSnackBar, handleGoogleLogin: mockHandleGoogleLogin }}>
        <GoogleSignInButton isSignIn={true} />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockHandleOpenSnackBar).toHaveBeenCalledWith('error', 'reCAPTCHA execution failed'));
  });

  it('displays correct text based on isSignIn prop', () => {
    // Check for sign-in text
    render(
      <AuthContext.Provider value={{ handleOpenSnackBar: mockHandleOpenSnackBar, handleGoogleLogin: mockHandleGoogleLogin }}>
        <GoogleSignInButton isSignIn={true} />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Sign In Via Google')).toBeInTheDocument();

    // Check for sign-up text
    render(
      <AuthContext.Provider value={{ handleOpenSnackBar: mockHandleOpenSnackBar, handleGoogleLogin: mockHandleGoogleLogin }}>
        <GoogleSignInButton isSignIn={false} />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Sign Up Via Google')).toBeInTheDocument();
  });
});
