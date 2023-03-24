import "../MuiClassNameSetup";

import {type AppType} from "next/app";
import {type Session} from "next-auth";
import {SessionProvider} from "next-auth/react";

import {api} from "@/utils/api";
import {Box, Container, CssBaseline, ThemeProvider} from "@mui/material";
import useTheme from "@/hooks/useTheme";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import {AnimatePresence} from "framer-motion";
import {ToastContainer} from "react-toastify";

const MyApp: AppType<{ session: Session | null }> = ({
                                                         Component,
                                                         pageProps: {session, ...pageProps},
                                                         router
                                                     }) => {
    const theme = useTheme("dark");
    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
                <Header/>
                <Box component={"main"} pt={{
                    xl: "64px",
                    lg: "64px",
                    md: "80px",
                    sm: "80px",
                    xs: "80px",
                }} overflow={"auto"}>
                    <Container>
                        <AnimatePresence mode={'wait'}>
                            <Layout key={router.asPath as string}>
                                <Box sx={{
                                    width: "100%",
                                    minHeight: "calc(100svh - 64px)",
                                }}>
                                    <Component {...pageProps} key={router.asPath as string}/>
                                </Box>
                            </Layout>
                        </AnimatePresence>
                    </Container>
                    <ToastContainer theme={"dark"}/>
                </Box>
                <CssBaseline/>
            </SessionProvider>
        </ThemeProvider>
    );
};

export default api.withTRPC(MyApp);
