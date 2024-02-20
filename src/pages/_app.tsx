import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { UserProvider } from 'src/contexts/UserContext';

const globalStyle = (
  <GlobalStyles
    styles={(theme) => ({
      'html, body, #root': {
        height: '100%',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
        fontFamily: theme.typography.fontFamily,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontSize: theme.typography.fontSize,
        lineHeight: '1.8rem',
        wordBreak: 'keep-all',
        WebkitTextSizeAdjust: 'none',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
      '#__next': {
        height: '100%',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
      '*': {
        boxSizing: 'border-box',
      },
      // html: {
      //   overflowY: 'scroll',
      // },
    })}
  />
);

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<AppProps, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const theme = createTheme();

  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>FTIsland</title>
        <meta name="description" content="Language Bridge with Multicultural Families" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=contain"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <UserProvider>
          <ThemeProvider theme={theme}>
            {globalStyle}
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}
