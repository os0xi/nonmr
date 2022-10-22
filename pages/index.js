import { useTheme } from "@emotion/react";
import {
  Button,
  createTheme,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { getSession, useSession } from "next-auth/react";

export default function Home({ session }) {
  const theme = useTheme();
  // const ss = useSession();

  return (
    <main>
      <Box
        sx={{
          ...theme.customElements.gradientText,
          paddingLeft: 2,
        }}
      >
        <Typography variant="h1" fontWeight={800}>
          Nonrm
        </Typography>
      </Box>
      <Box sx={{ ...theme.customElements.gradientText, padding: 2, mt: 3 }}>
        <Typography variant="h5" fontWeight={800}>
          Login and browse your NFTs, or just see the last NFTs bought by Snoop
          Dogg, Garry Vee and Elliotrades
        </Typography>
        <Typography variant="h5" fontWeight={800}>
          NextJS web3 login using NextAuth and Moralis
        </Typography>
      </Box>

      <Box sx={{ paddingLeft: 2 }}>
        <Typography variant="p">
          Sign in with Metamask using wagmi, ask Moralis for a message to sign,
          sign that message, verify signature with Moralis, send to NextAuth if
          successfull, get a session from it
        </Typography>

        {session && (
          <Box sx={{ ...theme.customElements.gradientText, pt: 10 }}>
            <Typography>Welcome {session.user.address}</Typography>
          </Box>
        )}
      </Box>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
