import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Container,
  createTheme,
  CssBaseline,
  Paper,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import theme from "../utils/theme/theme";
import { useState } from "react";
import { Box } from "@mui/system";
import Navigation from "../Components/Navigation/Navigation";
import Head from "next/head";

import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import WithAuth from "../utils/theme/WithAuth";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {
  const [currentTheme, setCurrentTheme] = useState("dark");

  const themeOptions = {
    ...theme,
    customElements: {
      gradientText: {
        backgroundcolor: "primary ",
        backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.primary.dark})`,
        backgroundSize: "100%",
        backgroundRepeat: "repeat",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "red",
      },
    },
    palette: {
      mode: currentTheme,
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
    },
  };
  let theme2 = createTheme(themeOptions);
  theme2 = responsiveFontSizes(theme2);
  function changeTheme() {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  }
  const [mainData, setMainData] = useState();
  const [profileData, setProfileData] = useState();
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme2}>
        <WagmiConfig client={client}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Head>
              <title>Nonrm</title>
              <meta name="description" content="NFT Address Browser" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Paper
              sx={{ width: "100%", height: "100%", minHeight: "100vh" }}
              elevation={0}
              square
            >
              <Box width="100%">
                <Navigation changeTheme={changeTheme} />
              </Box>

              <Container
                sx={{
                  paddingTop: "70px",
                  maxWidth: {
                    xs: "350px",
                    sm: "sm",
                    md: "md",
                    lg: "lg",
                    xl: "xl",
                  },
                }}
              >
                {Component.requiresAuth ? (
                  <WithAuth>
                    <Component {...pageProps} />
                  </WithAuth>
                ) : (
                  <Component {...pageProps} />
                )}
              </Container>
            </Paper>
          </SessionProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
