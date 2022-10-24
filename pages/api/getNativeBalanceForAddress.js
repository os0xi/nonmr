import axios from "axios";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

export default async function handler(req, res) {
  //   const address = req.body.address;
  const chain = EvmChain.ETHEREUM;

  const address = "0xd257C4D7fFb737295E3c608277046D170B3B153D";
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const ethBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain,
  });
  console.log(ethBalance);
  res.status(200).json({
    ethBalance: Number(ethBalance.data.balance).toPrecision(3) / 1e18,
  });
}
