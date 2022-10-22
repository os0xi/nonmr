import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { cloneElement } from "react";

function SvgIcon({ children }) {
  //   let TheIcon = children.component;
  const theme = useTheme();
  const newIcon = cloneElement(children, {
    sx: { fill: "url(#linearColors)" },
  });
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor={theme.palette.primary.dark} />
          <stop offset={1} stopColor={theme.palette.secondary.light} />
        </linearGradient>
      </svg>
      {newIcon}
    </Box>
  );
}

export default SvgIcon;
