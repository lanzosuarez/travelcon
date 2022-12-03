/* eslint-disable import/export */
import React from 'react';
import { LocationGenerics, routes } from '@/routes';
import { customTheme } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactLocation, Router } from '@tanstack/react-location';
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

const location = new ReactLocation<LocationGenerics>();

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <ChakraProvider theme={customTheme}>
        <Router location={location} routes={routes}>
          {children}
        </Router>
      </ChakraProvider>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
