import axios from "axios";
export default async function handler(req, res) {
  const contract = require("../../../Components/Contracts/Nft800.json");
  console.log(JSON.stringify(contract.abi));
  const key = process.env.PINATA_KEY;
  const secret = process.env.PINATA_SECRET;

  async function saveImageToIPFS(path, content) {
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
          // "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3",
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

  async function pinJSONToIPFS(JSONBody) {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
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
    //making axios POST request to Pinata ⬇️
  }

  const path = req.body.path;
  const content = req.body.content;
  const ipfsResponse = await saveImageToIPFS(path, content);
  console.log(ipfsResponse);
  res.status(200).json({ path: ipfsResponse });
  //   res.status(200).json({ 1: JSON.stringify(contract.abi) });
}
