import React from 'react';
import LoginPage from './LoginPage';
import { render, screen } from '@/utils/test-utils';

describe('LoginPage', () => {
  it('should render the Login Heading', () => {
    render(<LoginPage />);
    screen.getByRole('heading', {
      name: /login/i,
    });
  });
  it('should render email input and label', () => {
    render(<LoginPage />);
    screen.getByText(/email address/i);
    screen.getByRole('textbox', {
      name: /email address/i,
    });
  });
  it('should render password input and label', () => {
    render(<LoginPage />);
    screen.getByLabelText(/password/i);
    screen.getByText(/forgot password/i);
  });

  it('should render the login button', () => {
    render(<LoginPage />);
    screen.getByRole('button', {
      name: /login/i,
    });
    screen.getByText(/don't have an account\?/i);
    screen.getByRole('link', {
      name: /sign up here!/i,
    });
  });
});
