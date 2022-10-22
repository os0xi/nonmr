import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NftCard from "../Components/NftCard";
import SelectFrenButton from "../Components/SelectFrenButton";

function Frens() {
  const [fren, setFren] = useState();
  const [nfts, setNfts] = useState();

  async function handleSelectFren(frend) {
    if (fren === frend) {
      setFren(null);
    } else {
      setFren(frend);
    }
  }

  useEffect(() => {
    const snoopAddress = "0xCe90a7949bb78892F159F428D0dC23a8E3584d75";
    const garyVeeAddress = "0x8f7ceefaa1ff5dfd125106ff9e219eff360d57aa";
    let currentFrenAddress;
    if (fren === "snoop") {
      currentFrenAddress = snoopAddress;
    } else {
      currentFrenAddress = garyVeeAddress;
    }
    async function getNfts(fren) {
      const userData = {
        user: { address: currentFrenAddress },
      };
      const data = await axios.post(
        "api/requests/nfts/getNftTransfersForAddress",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      data.data[1] && setNfts([data.data[1]]);
    }

    if (fren) {
      getNfts(snoopAddress);
    }
  }, [fren]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="60vh"
      height="100%"
    >
      <Box
        position={fren ? "fixed" : "relative"}
        left={20}
        minHeight="100%"
        height={!fren ? "60vh" : "100%"}
        display="flex"
        flexWrap="wrap"
        flexDirection={fren ? "column" : "row"}
        gap={5}
        justifyContent={!fren ? "center" : "flex-start"}
        alignItems="center"
      >
        <SelectFrenButton
          sx={{
            width: fren ? (fren === "snoop" ? 70 : 50) : 200,
            height: fren ? (fren === "snoop" ? 70 : 50) : 200,
            backgroundColor: "transparent",
            border: "3px solid black",
            borderColor: fren === "snoop" ? "primary.dark" : "primary.light",
          }}
          onClick={() => {
            handleSelectFren("snoop");
          }}
          src="https://raw.githubusercontent.com/os0xi/snoop_nfts/master/src/images/avatars/snoop4.png"
        />

        <SelectFrenButton
          sx={{
            width: fren ? (fren === "garyvee" ? 70 : 50) : 200,
            height: fren ? (fren === "garyvee" ? 70 : 50) : 200,
            backgroundColor: "transparent",
            border: "3px solid black",
            borderColor: fren === "garyvee" ? "primary.dark" : "primary.light",
          }}
          onClick={() => {
            handleSelectFren("garyvee");
          }}
        >
          <img
            style={{ width: fren ? "40px" : "150px", height: "auto" }}
            src="https://raw.githubusercontent.com/os0xi/snoop_nfts/master/src/images/avatars/garyvee1.png"
            alt=""
          />
        </SelectFrenButton>
      </Box>
      {fren && (
        <Box
          width="100%"
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
        >
          {
            nfts &&
              nfts[0].map((nft) => {
                console.log(nfts);
                return <NftCard nft={nft} user={fren} key={Math.random()} />;
              })
            // nfts.map((nft) => {
            //   return <NftCard nft={nft} user={fren} key={Math.random()} />;
            // })
          }
        </Box>
      )}
    </Box>
  );
}
Frens.requiresAuth = true;
export default Frens;
