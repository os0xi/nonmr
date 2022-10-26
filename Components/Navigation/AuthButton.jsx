import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect,
  useNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function AuthButton() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const session = useSession();

  const [errorMessage, setErrorMessage] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    async function disconnectAll() {
      address && (await disconnectAsync()); //metamask wallet
      session.data && signOut({ redirect: "/" }); //from next
      setSnackBarOpen(true);
      setErrorMessage("Address changed");
    }

    if (
      (address && session.data && address !== session.data.user.address) ||
      !chain
    ) {
      console.log("disconnecting all");
      disconnectAll();
    }
  }, [address, disconnectAsync, session.data, chain]);

  function handleSnackBarClose() {
    setSnackBarOpen(false);
  }

  function handleClose() {}

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    console.log(isConnected);
    try {
      if (isConnected) {
        window.localStorage.setItem("user", null);
        window.localStorage.setItem("nfts", null);
        window.localStorage.setItem("ethBalance", null);
        await disconnectAsync(); //metamask wallet
        signOut({ redirect: "/" });
        setSnackBarOpen(true);
        setErrorMessage("Success");
        return;
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
      setErrorMessage("Success");
      setSnackBarOpen(true);
      console.log(session);
    } catch (err) {
      await disconnectAsync();
      setSnackBarOpen(true);
      if (session.status === "authenticated") {
        signOut({ redirect: "/" }); //from next
      }
    }
  };

  return (
    <>
      <Button onClick={() => handleAuth()} size="small">
        <Typography fontSize={12.5} sx={{ fontWeight: 700 }}>
          {session.status === "authenticated" ? "Logout" : "Login"}
        </Typography>
      </Button>

      <Snackbar
        color="danger"
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert
          severity={errorMessage === "Success" ? "success" : "error"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
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
