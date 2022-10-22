import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Box
      width="100%"
      height="500px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
