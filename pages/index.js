import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import { useNetwork } from "wagmi";

export default function Home() {
  const { chain } = useNetwork();
  const theme = useTheme();
  const session = useSession();
  console.log(chain);
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

        {session.data && chain && (
          <Box sx={{ ...theme.customElements.gradientText, pt: 10 }}>
            <Typography>
              Welcome to {chain.name}, {session.data.user.address}
            </Typography>
          </Box>
        )}
      </Box>
    </main>
  );
}
