import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import { useTheme } from "@emotion/react";

import React from "react";

function Profile() {
  const theme = useTheme();
  const session = useSession();

  return (
    <Box>
      <Typography variant="p" fontWeight={700}>
        {`Address `}

        <Typography
          variant="span"
          sx={{ ...theme.customElements.gradientText }}
        >
          {session.data.user.address}
        </Typography>
      </Typography>
    </Box>
  );
}

Profile.requiresAuth = true;

export default Profile;
