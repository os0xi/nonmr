const alchemyKey = process.env.ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export default async function handler(req, res) {
  let contract;

  async function getContract() {
    contract = await new web3.eth.Contract(contractABI, contractAddress);
  }

  let contractABI = require("../../../Components/Contracts/Nft800.json");
  contractABI = contractABI.abi;
  const contractAddress = "0x9b63ecaba8fc130ec5d2b2b14c8949b4c61b294b";

  res.status(200).json({ contract: contract.methods });
}
