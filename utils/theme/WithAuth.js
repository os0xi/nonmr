import { getSession, useSession } from "next-auth/react";
import { Router } from "next/router";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function WithAuth({ session, children }) {
  const { data, status } = useSession();
  const { push } = useRouter();
  useEffect(() => {
    if (status !== "authenticated") {
      push("/");
    }
  }, [data, status, push]);

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
  }
}

export default WithAuth;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: { session: session },
  };
}
