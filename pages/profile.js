import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getSession, useSession } from "next-auth/react";
import { useTheme } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Refresh } from "@mui/icons-material";
import { useNetwork } from "wagmi";

function Profile({ profileData, setProfileData }) {
  const theme = useTheme();
  const session = useSession();
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState({ balance: null });
  const { chain } = useNetwork();
  console.log(chain);

  function handleRefresh() {
    window.localStorage.setItem("ethBalance", null);
    setData({ balance: null });
    setRefresh((oldState) => !oldState);
  }

  useEffect(() => {
    console.log("effect triggered");
    async function getEthBalance(address) {
      console.log("getting balance from api");
      const ethBalanceResult = await axios.post(
        "/api/getNativeBalanceForAddress",
        { chain: chain.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.localStorage.setItem(
        "ethBalance",
        ethBalanceResult.data.ethBalance
      );
      setRefresh((oldState) => !oldState);

      // const socialData = await axios.get("/api/requests/nfts/getSocialData");
      // ethBalance = ethBalanceResult;
    }

    if (!JSON.parse(window.localStorage.getItem("ethBalance"))) {
      getEthBalance();
    } else {
      console.log("Setting balance");
      setData((oldData) => {
        return {
          ...oldData,
          balance: window.localStorage.getItem("ethBalance"),
        };
      });
    }
  }, [refresh, chain]);

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <IconButton onClick={handleRefresh}>
          <Refresh />
        </IconButton>
      </Box>
      <Typography variant="p" fontWeight={700}>
        {`Address `}

        <Typography
          variant="span"
          sx={{ ...theme.customElements.gradientText }}
        >
          {session.data.user.address}
        </Typography>
      </Typography>
      {data.balance && (
        <Typography variant="p" fontWeight={700} sx={{ width: 200 }}>
          {`Balance `}

          <Typography
            variant="span"
            sx={{ ...theme.customElements.gradientText }}
          >
            {data.balance} Ξ
          </Typography>
        </Typography>
      )}
      {/* {nftsLength && (
        <Typography variant="p" fontWeight={700}>
          {`NFTs  `}

          <Typography
            variant="span"
            sx={{ ...theme.customElements.gradientText }}
          >
            {nftsLength} nfts
          </Typography>
        </Typography>
      )} */}
    </Box>
  );
}

Profile.requiresAuth = true;

export default Profile;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   let ethBalance;
//   async function getEthBalance(address) {
//     // const ethBalanceResult = await axios.get("/api/getNativeBalanceForAddress");
//     const socialData = await axios.get("/api/requests/nfts/getSocialData");
//     // ethBalance = ethBalanceResult;
//   }

//   await getEthBalance();
//   console.log(ethBalance);
//   return {
//     props: { balance: 1 },
//   };
// }
