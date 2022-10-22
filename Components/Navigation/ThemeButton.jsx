import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box, createTheme, Fab, Icon, useTheme } from "@mui/material";
import React from "react";
import SvgIcon from "../SvgIcon";

function ThemeButton({ changeTheme }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        boxShadow: "none",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "transparent",
          //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        },
      }}
      size="small"
      color="primary"
      onClick={changeTheme}
    >
      {theme.palette.mode === "light" ? (
        <SvgIcon>
          <LightModeOutlined />
        </SvgIcon>
      ) : (
        <SvgIcon>
          <DarkModeOutlined />
        </SvgIcon>
      )}
    </Box>
  );
}

export default ThemeButton;
