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

const Header = dynamic(() => import('@/components/header'), {
  loading: () => <Loader height={64} width={'100%'} />,
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const theme = useTheme('dark');
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
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
