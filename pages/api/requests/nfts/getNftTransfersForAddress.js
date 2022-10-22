// import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import axios from "axios";

export default async function handler(req, res) {
  const chain = EvmChain.ETHEREUM;

  // await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  // const address = req.body.user.address;
  // 0x8f7ceefaa1ff5dfd125106ff9e219eff360d57aa
  const address = "0x8f7ceefaa1ff5dfd125106ff9e219eff360d57aa";

  const nftBuysForAddress = {
    method: "GET",
    url: `https://deep-index.moralis.io/api/v2/${address}/nft/transfers`,
    params: { chain: "eth", format: "decimal", direction: "to" },
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.MORALIS_API_KEY,
    },
  };

  async function getNftMetaData(address, token_id) {
    // console.log("Parameters:", address, token_id);

    const nftMetadata = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/nft/${address}/${token_id}`,
      params: { chain: "eth", format: "decimal" },
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.MORALIS_API_KEY,
      },
    };
    return await axios
      .request(nftMetadata)
      .then(async function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  const nftBuysResult = await axios.request(nftBuysForAddress);

  let nftDataArray = [];

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  await wait(100);

  let onlyTrasnfersWithValue = [];

  nftBuysResult.data.result.forEach((transfer) => {
    if (transfer.value > 10000) onlyTrasnfersWithValue.push(transfer);
  });

  let finalArray = [];
  let intervalIterator = 0;

  function getIt() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        if (intervalIterator > 4) {

          clearInterval(interval);
          resolve(finalArray);
        }

        const transfer = onlyTrasnfersWithValue[intervalIterator];

        getNftMetaData(transfer.token_address, transfer.token_id).then(
          (result) => {
            finalArray.push({
              ...result,
              price: onlyTrasnfersWithValue[intervalIterator].value,
            });
          }
        );
        intervalIterator += 1;
      }, 260);
    });
  }

  getIt()
    .then((result) => {
      console.log("got it", result.length);
      res.send(result);
    })
    .catch((error) => res.send(error));
}
// for (let i = 0; i < L; i++) {
//   const transfer = onlyBoughtNfts[i];
//   console.log(transfer.value);
//   const price = transfer.value;
//   let result;
//   result = await getNftMetaData(transfer.token_address, transfer.token_id)
//     .then(async (nftData) => {
//       return {
//         name: nftData.name,
//         metadata: nftData.metadata,
//         price: transfer.value,
//       };
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   nftDataArray.push(result);

//   if (i === L - 1) {
//     res.send({ 1: nftDataArray });
//     console.log("ended");
//   }
// }
// example console after running:

// Old Lunar Colony Limited
// The World Today collection
// Finiliar
// Finiliar
// The World Today collection
// Finiliar
// The World Today collection
// The World Today collection
// Finiliar
// The World Today collection
// The World Today collection
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Finiliar
// Finiliar
// The World Today collection
// The World Today collection
// Finiliar
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Finiliar
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// The World Today collection
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// AxiosError                               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// The World Today collection
