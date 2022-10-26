import {
  DarkModeOutlined,
  Light,
  LightMode,
  LightModeOutlined,
  Surfing,
  SurfingOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Fab,
  Icon,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import AuthButton from "./AuthButton";
import NavigationButton from "./NavigationButton";
import ThemeButton from "./ThemeButton";

function Navigation({ changeTheme }) {
  const theme = useTheme();
  const router = useRouter();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated" ? true : false;

  function navigateTo(url) {
    router.push(url);
  }
  return (
    <Box
      position="fixed"
      color="transparent"
      sx={{
        boxShadow: "none",
        width: "100%",
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          width: "100%",
          px: 2,
          py: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box width="25%">
          <Typography
            sx={{ ...theme.customElements.gradientText }}
            variant="p"
            color="primary"
            fontWeight={800}
            fontSize={20}
            letterSpacing={1}
          >
            NONRM Ξ
          </Typography>
        </Box>

        <Box width="50%" display="flex" justifyContent="center" gap={2} mr={0}>
          <NavigationButton path="/" navigateTo={navigateTo} name="Home" />
          {isAuthenticated && (
            <NavigationButton
              path="/profile"
              navigateTo={navigateTo}
              name="Profile"
            />
          )}
          {isAuthenticated && (
            <NavigationButton
              path="/nfts"
              navigateTo={navigateTo}
              name="My NFTs"
            />
          )}
          <NavigationButton
            path="/social"
            navigateTo={navigateTo}
            name="Social"
          />
          {isAuthenticated && (
            <NavigationButton
              path="/ipfs"
              navigateTo={navigateTo}
              name="Save to IPFS"
            />
          )}
        </Box>

        <Box
          width="25%"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={0}
        >
          <AuthButton />
          <ThemeButton changeTheme={changeTheme} />
        </Box>
      </Paper>
    </Box>
  );
}

export default Navigation;
