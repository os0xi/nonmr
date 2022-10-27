import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import axios from "axios";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const _ = require("lodash");

export default async function handler(req, res) {
  const chain = req.body.chain;
  const contractABI = require("../../../Components/Contracts/Nft8001.json").abi;
  const contractAddress = "0xC6DAe01Daba875a7E79419D5B06ED6473FaEa5E0";

  const recipient = req.body.address;
  const tokenURI = req.body.tokenURI;

  const alchemyKey = process.env.ALCHEMY_KEY;

  const web3 = createAlchemyWeb3(alchemyKey);

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  let deepCopy = _.cloneDeep(contract);
  deepCopy.methods = _.cloneDeep(contract.methods);
  console.log(deepCopy.methods["mintNFT"]);
  console.log("xx");
  const functionMint = contract.methods["mintNFT"];
  console.log(typeof functionMint);
  res.status(200).send(JSON.stringify({ mintNFt: functionMint.toString() }));
}
