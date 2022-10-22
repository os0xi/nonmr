import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getSession } from "next-auth/react";
import { useTheme } from "@emotion/react";

import React from "react";

function Profile({ session }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="p" fontWeight={700}>
        {`Address `}
        <Typography
          variant="span"
          sx={{ ...theme.customElements.gradientText }}
        >
          {session.user.address}
        </Typography>
      </Typography>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // redirect if not authenticated
  //handled with Profile.requiresAuth = true && <WithAuth> hoc now
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { session: session },
  };
}
Profile.requiresAuth = true;

export default Profile;
