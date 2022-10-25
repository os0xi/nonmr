import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

export default async function handler(req, res) {
  const chain = req.body.chain;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  function delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  async function getNftMetaData(address, chain, tokenId) {
    const response = await Moralis.EvmApi.nft.getNFTTransfers({
      address,
      chain,
      tokenId,
    });

    const priceInEth = (
      Number(response.result[0].value) / 1000000000000000000000000000000000000
    ).toFixed(3);

    if (priceInEth > 0) {
      return { price: priceInEth };
    } else return { price: null };
  }

  function delay(ms) {
    return new Promise((resolver) => {
      setTimeout(resolver, ms);
    });
  }

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address: req.body.user.address,
    chain,
  });

  // let pricesArray = [];

  // for (const nft of response.data.result) {
  //   const nftPrice = await getNftMetaData(
  //     nft.token_address,
  //     chain,
  //     nft.token_id
  //   );
  //   console.log(nftPrice);
  //   pricesArray.push(nftPrice);
  // }
  // console.log(pricesArray);

  res.status(200).json({ ...response });

  //older
  if (false) {
    //old, not working with many nfts
    response.data.result.forEach(async (nft) => {
      const nftPrice = await getNftMetaData(
        nft.token_address,
        chain,
        nft.token_id
      );
      newNftsData.push(nftPrice);
    });

    const x = await Promise.allSettled(
      response.data.result.map((nft, index) =>
        delay(1000).then(() =>
          getNftMetaData(nft.token_address, chain, nft.token_id).then(
            (nftPriceData) => nftPriceData
          )
        )
      )
    );

    const newResult = await Promise.all(
      response.data.result.map((nft, index) => {
        let data;
        delay(index * 1).then(() =>
          getNftMetaData(nft.token_address, chain, nft.token_id).then(
            (nftData) => {
              data = {
                lastNftPrice: nftData,
                ...nft,
              };
            }
          )
        );
        console.log("DASS", data);

        // setTimeout(() => {
        //   const nftData = getNftMetaData(
        //     nft.token_address,
        //     chain,
        //     nft.token_id
        //   ).then((result) => {
        //     data = {
        //       lastNftPrice: nftData,
        //       ...nft,
        //     };
        //   });
        //   console.log("DATAIS", data);
        // }, 1);
        // const nftData = await getNftMetaData(
        //   nft.token_address,
        //   chain,
        //   nft.token_id
        // );
        // return {
        //   lastNftPrice: nftData,
        //   ...nft,
        // };
      })
    );
    const newResponse = {
      ...response,
      data: { ...response.data, result: [...newResult] },
    };
  }
}
