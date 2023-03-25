import '../MuiClassNameSetup';

import { type AppType } from 'next/app';

import { api } from '@/utils/api';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import useTheme from '@/hooks/useTheme';
import Layout from '@/components/Layout';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import Head from 'next/head';

const Header = dynamic(() => import('@/components/header'), {
  loading: () => <Loader height={64} width={'100%'} />,
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const theme = useTheme('dark');
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Yatochka 8200</title>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta
          property="og:image"
          content="https://yourdomain.com/icons/apple-touch-icon.png"
        />
      </Head>
      <Header />
      <Box
        component={'main'}
        pt={{
          xl: '64px',
          lg: '64px',
          md: '80px',
          sm: '80px',
          xs: '80px',
        }}
        overflow={'auto'}
      >
        <Container>
          <AnimatePresence mode={'wait'}>
            <Layout key={router.asPath}>
              <Box
                sx={{
                  width: '100%',
                  minHeight: 'calc(100svh - 64px)',
                }}
              >
                <Component {...pageProps} key={router.asPath} />
              </Box>
            </Layout>
          </AnimatePresence>
        </Container>
      </Box>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
