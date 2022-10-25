import React from "react";
import { useNetwork } from "wagmi";

function Mint() {
  const { chain } = useNetwork();

  return chain.name !== "Chain 137" ? (
    <div>Please switch your Metamask to the Matic Network.</div>
  ) : (
    <div>Welcome to Matic. Mint starting soon</div>
  );
}

Mint.requiresAuth = true;

export default Mint;
