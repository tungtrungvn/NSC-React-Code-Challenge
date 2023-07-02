/*
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
*/

import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({ key: 'css', prepend: true });
const theme = createTheme();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;