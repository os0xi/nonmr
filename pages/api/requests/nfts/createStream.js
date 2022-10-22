import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
export default async function handler(req, res) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const stream = {
    chains: [EvmChain.ETHEREUM], // punks are on ethereum mainnet
    description: "all cryptopunk transfers", // your description
    tag: "cryptoPunks", // give it a tag
    topic0: ["PunkTransfer(address,address,uint256)"], // topic0 is the event signature
    includeContractLogs: true, // we want to include contract logs
    abi: [
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "punkIndex", type: "uint256" },
        ],
        name: "PunkTransfer",
        type: "event",
      },
    ],
    webhookUrl: "https://eo9mw8cne2df9aa.m.pipedream.net", // webhook url to receive events,
  };

  const newStream = await Moralisdddddddddddddddddddddddddddddddddddddddddddddd.Streams.add(stream);

  const { id } = newStream.toJSON(); // { id: 'YOUR_STREAM_ID', ...newStream }

  const address = "0x68b3f12d6e8d85a8d3dbbc15bba9dc5103b888a4";

  await Moralis.Streams.addAddress({ address, id });

  res.status(200).json(newStream);
}
