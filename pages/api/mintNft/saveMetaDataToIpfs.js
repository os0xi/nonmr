import axios from "axios";
export default async function handler(req, res) {
  async function saveMetaDataToIpfs(path, content) {
    console.log("writing to IPFS");
    const options = {
      method: "POST",
      url: "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-Key": process.env.MORALIS_API_KEY,
      },
      data: [
        {
          path: path,
          content: content,
        },
      ],
    };

    return axios
      .request(options)
      .then(function (response) {
        console.log("IPFS ", response.data);
        return response.data;
      })
      .catch(function (error) {
        // console.error(error);
        console.log(error);
        return error;
      });
  }

  const pinJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: process.env.PINATA_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET,
        },
      })
      .then(function (response) {
        return {
          success: true,
          pinataUrl:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const metaData = req.body.content;
  console.log(metaData);
  const pinataUrl = await pinJSONToIPFS(metaData);
  console.log("pinataUrl", pinataUrl);
  //   const ipfsResponse = await saveMetaDataToIpfs(path, metaData);
  //   console.log(ipfsResponse);
  res.status(200).json({ path: pinataUrl.pinataUrl });
  //   res.status(200).json({ 1: JSON.stringify(contract.abi) });
}
