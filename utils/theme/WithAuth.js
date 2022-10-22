import { getSession, useSession } from "next-auth/react";
import { Router } from "next/router";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function WithAuth({ session, children }) {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [data, status, router]);

  if (status === "authenticated") return <>{children}</>;
}

export default WithAuth;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/",
  //         permanent: false,
  //       },
  //     };
  //   }
  return {
    props: { session: session },
  };
}
