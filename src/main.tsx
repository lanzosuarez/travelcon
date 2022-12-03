import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-day-picker/dist/style.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/900.css';

import { LocationGenerics, routes } from './routes';
import { customTheme } from './theme';
import { ReactLocation, Router } from '@tanstack/react-location';
import { ErrorPage, Loading } from './components/common';

const location = new ReactLocation<LocationGenerics>();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Router
        defaultPendingMs={100}
        defaultPendingMinMs={1000}
        location={location}
        routes={routes}
        defaultPendingElement={<Loading variant="full" />}
        defaultErrorElement={<ErrorPage />}
      />
    </ChakraProvider>
  </React.StrictMode>,
);
