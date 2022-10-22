import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function NavigationButton({ navigateTo, path, name }) {
  const router = useRouter();
  const isActive = router.pathname === path ? true : false;
  return (
    <Button
      variant={isActive ? "outlined" : "text"}
      size="small"
      color={isActive ? "secondary" : "primary"}
      onClick={() => {
        navigateTo(path);
      }}
    >
      {name}
    </Button>
  );
}

export default NavigationButton;
