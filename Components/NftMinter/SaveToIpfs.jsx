import { Box, Button, Input, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function SaveToIpfs() {
  const [selectedFile, setSelectedFile] = useState("");
  const [base64IMG, setBase64IMG] = useState();
  const [fileName, setFileName] = useState();
  const [ipfsPath, setIpfsPath] = useState();
  async function selectFile(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
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
    async function writeToIpfs() {
      const ipfsPathResponse = await axios.post(
        "/api/mintNft/saveToIpfs",
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

    fileName && base64IMG ? writeToIpfs() : null;
  }, [base64IMG, fileName]);

  return (
    <Box width="100%">
      <Button variant="contained" component="label">
        Upload file
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={selectFile}
        />
      </Button>
      {ipfsPath ? (
        <Box
          mt={3}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          alignItems="center"
          justifyContent="center"
        >
          <img src={ipfsPath} alt="" style={{ maxWidth: 300 }} />
          <Typography>{"File saved to IPFS "}</Typography>
          <Button href={ipfsPath}>Visit</Button>
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
