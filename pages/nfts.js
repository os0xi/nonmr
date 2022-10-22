import { Box } from "@mui/system";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NftCard from "../Components/NftCard";

function Nfts({ profileData, setProfileData }) {
  const session = useSession();
  const [props, setProps] = useState();

  useEffect(() => {
    async function getData() {
      console.log(session.data.user.address);
      const userData = { user: { address: session.data.user.address } };
      console.log(userData);
      // console.log(session);
      const data = await axios.post("/api/requests/nfts/getNfts", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const nfts = data.data;
      setProfileData({ user: session.data.user.address, nfts });
    }
    if (!profileData) {
      getData();
    } else {
      setProps({ user: profileData.user, nfts: profileData.nfts });
    }
  }, [profileData, setProfileData, session]);

  return (
    <main>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {props &&
          props.nfts.data.result.map((nft) => {
            return <NftCard nft={nft} key={Math.random()} user={props.user} />;
          })}
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
