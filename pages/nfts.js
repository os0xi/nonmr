import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import NftCard from "../Components/NftCard";

function Nfts() {
  const session = useSession();
  const [props, setProps] = useState();
  const [refresh, setRefresh] = useState(true);

  function handleRefresh() {
    window.localStorage.setItem("nfts", null);
    window.localStorage.setItem("user", null);
    setProps(null);
    setRefresh((oldRefresh) => !oldRefresh);
  }

  useEffect(() => {
    const localNftData = JSON.parse(window.localStorage.getItem("nfts"));
    const localUserData = JSON.parse(window.localStorage.getItem("user"));

    async function getData() {
      const userData = { user: { address: session.data.user.address } };
      console.log("getting data");
      const data = await axios.post("/api/requests/nfts/getNfts", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const nfts = data.data;
      console.log("got data");

      window.localStorage.setItem(
        "user",
        JSON.stringify(session.data.user.address)
      );
      window.localStorage.setItem("nfts", JSON.stringify(nfts));
      setRefresh((oldRefresh) => !oldRefresh);
    }

    if (!localNftData || !session.data.user.address) {
      getData();
    } else {
      setProps({ user: localUserData, nfts: localNftData });
    }
  }, [refresh, session.data.user.address]);

  return (
    <main>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {!props && <Loader />}
        {props && props.nfts && (
          <Box width="100%">
            <Box>
              <Box>
                <IconButton onClick={handleRefresh}>
                  <Refresh />
                </IconButton>
              </Box>
            </Box>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              gap={2}
              flexWrap="wrap"
            >
              {props.nfts.data.result.map((nft) => {
                return (
                  <NftCard nft={nft} key={Math.random()} user={props.user} />
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </main>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: "/",
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   if (session) {
//     const userData = { user: { address: session.user.address } };
//     const data = await axios.post(
//       "http://127.0.0.1:3000/api/requests/nfts/getNfts",
//       userData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return {
//       props: { user: session.user.address, nfts: data.data },
//     };
//   } else return { props: {} };
// }
Nfts.requiresAuth = true;
export default Nfts;
