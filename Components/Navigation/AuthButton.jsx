import { Button, Typography, useTheme } from "@mui/material";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import axios from "axios";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthButton() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const session = useSession();
  const theme = useTheme();
  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
      if (session.status === "authenticated") {
        signOut();
        return;
      }
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const userData = { address: account, chain: chain.id, network: "evm" };
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    const { url } = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/",
    });
    push(url);
  };

  return (
    <Button onClick={() => handleAuth()} size="small">
      <Typography fontSize={12.5} sx={{ fontWeight: 700 }}>
        {session.status === "authenticated" ? "Logout" : "Login"}
      </Typography>
    </Button>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   // redirect if not authenticated
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { user: session.user },
//   };
// }

export default AuthButton;
