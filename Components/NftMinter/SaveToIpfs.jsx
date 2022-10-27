import { Box, Button, Input, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Image from "next/image";
function SaveToIpfs() {
  const [base64IMG, setBase64IMG] = useState();
  const [fileName, setFileName] = useState();
  const [ipfsPath, setIpfsPath] = useState();
  const [nftName, setNftName] = useState();
  const [nftDescription, setNftDescription] = useState();
  const [nftMetadata, setNftMetadata] = useState();
  const [contract, setContract] = useState();
  const [mintTransaction, setMintTransaction] = useState();

  const contractABI = require("../Contracts/Nft8001.json").abi;
  const contractAddress = "0xC6DAe01Daba875a7E79419D5B06ED6473FaEa5E0";

  function handleNameChange(e) {
    setNftName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setNftDescription(e.target.value);
  }

  async function writeMetaDataToIpfs() {
    const ipfsPathResponse = await axios.post(
      "/api/mintNft/saveMetaDataToIpfs",
      {
        content: {
          name: nftName,
          description: nftDescription,
          image: ipfsPath,
        },
        path: `/nomr1/${nftName}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return ipfsPathResponse;
  }
  async function handleMintNft(e) {
    e.preventDefault();
    const metadataurl = await writeMetaDataToIpfs();
    console.log(metadataurl);
    setNftMetadata(
      metadataurl.data.path.replace(
        "https://gateway.pinata.cloud/",
        "https://ipfs.moralis.io:2053/"
      )
    );
  }

  async function getContract() {
    const contract2 = await axios.get("/api/mintNft/getContract");
    console.log(contract2.data.contract);
    setContract(contract2.data.contract);
  }

  async function mintNft() {
    const ALCHEMY_KEY = await axios.get("/api/mintNft/getAlchemyUrl");
    const web3 = createAlchemyWeb3(ALCHEMY_KEY.data.ALCHEMY_KEY);

    console.log("web3", { web3: web3 });
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    window.contract = contract;
    console.log(contract);
    const gasAprox = await window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, nftMetadata)
      .estimateGas({ from: window.ethereum.selectedAddress });
    console.log(gasAprox);
    const transactionParameters = {
      gas: ethers.utils.hexlify(gasAprox),
      gasPrice: await web3.eth.getGasPrice(function (e, r) {
        return r;
      }),
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address
      data: window.contract.methods
        .mintNFT(window.ethereum.selectedAddress, nftMetadata)
        .encodeABI(), //make call to NFT smart contract
    };
    console.log(transactionParameters);
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      setMintTransaction("https://goerli.etherscan.io/tx/" + txHash);
      return {
        success: true,
        status:
          "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" +
          txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
    // const contract = new web3.eth.Contract(contractABI, contractAddress);

    // window.contract = contract;
    // console.log(window.contract);
  }

  async function selectFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64IMG(reader.result);
      setFileName(
        file.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, "")
      );
    };
  }

  useEffect(() => {
    async function writeImageToIpfs() {
      const ipfsPathResponse = await axios.post(
        "/api/mintNft/saveImageToIpfs",
        {
          content: base64IMG,
          path: `/nomr1/${fileName}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(ipfsPathResponse.data.path[0].path);
      setIpfsPath(ipfsPathResponse.data.path[0].path);
    }

    fileName && base64IMG && !ipfsPath ? writeImageToIpfs() : null;
  }, [base64IMG, fileName, ipfsPath]);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      p={10}
      gap={4}
    >
      {mintTransaction ? <a href={mintTransaction}>{mintTransaction}</a> : null}
      {/* <Button onClick={getContract}>Get Contract</Button> */}
      {/* <Button onClick={mintNft}>Mint</Button> */}
      <form>
        <Box display="flex" flexDirection="column" gap={2} maxWidth={300}>
          <Box>
            <TextField
              required
              label="Enter NFT name"
              onChange={handleNameChange}
              sx={{ width: 300 }}
            />
          </Box>
          <Box>
            <TextField
              required
              label="Enter NFT description"
              onChange={handleDescriptionChange}
              sx={{ width: 300 }}
            />
          </Box>
          {!ipfsPath ? (
            <Button variant="contained" component="label">
              Upload file
              <input
                required
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={selectFile}
              />
            </Button>
          ) : (
            <Button href={ipfsPath}>Image Link</Button>
          )}

          {ipfsPath && nftName && nftDescription && !nftMetadata ? (
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleMintNft}
            >
              Save Everything to IPFS
            </Button>
          ) : nftMetadata ? (
            <Button
              disabled
              variant="contained"
              color="success"
              type="submit"
              onClick={handleMintNft}
            >
              Save Everything to IPFS
            </Button>
          ) : null}
        </Box>
        {nftMetadata ? (
          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Button variant="contained" href={nftMetadata}>
              MetaData Link
            </Button>
            <Button color="success" variant="contained" onClick={mintNft}>
              Mint this NFT
            </Button>
          </Box>
        ) : null}
      </form>

      {nftMetadata ? (
        <Box
          mt={3}
          display="flex"
          flexDirection="column"
          gap={3}
          alignItems="center"
          justifyContent="center"
        >
          <img src={ipfsPath} alt="" style={{ maxWidth: 300 }} />
          <Typography>Name: {nftName}</Typography>
          <Typography>Description: {nftDescription}</Typography>
        </Box>
      ) : null}

      {/* <Button>
        <Input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={selectFile}
        />
      </Button> */}
    </Box>
  );
}

export default SaveToIpfs;
