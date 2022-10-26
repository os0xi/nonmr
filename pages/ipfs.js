import React from "react";
import { useNetwork } from "wagmi";
import NftMinter from "../Components/NftMinter/SaveToIpfs";
import NftNetworkChangeRequired from "../Components/NftMinter/NftNetworkChangeRequired";
import SaveToIpfs from "../Components/NftMinter/SaveToIpfs";

function Mint() {
  return <SaveToIpfs />;
}

Mint.requiresAuth = true;

export default Mint;
