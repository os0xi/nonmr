import { useTheme } from "@emotion/react";
import { Refresh } from "@mui/icons-material";
import { Chip, IconButton, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import SocialNft from "../Components/SocialNft";

function Social() {
  const [data, setData] = useState();
  const [buysOrSales, setBuysOrSales] = useState(true);
  const theme = useTheme();
  const [refresh, setRefresh] = useState(true);

  function handleRefresh() {
    window.localStorage.setItem("socialData", null);
    setData(null);
    setRefresh((oldState) => !oldState);
  }

  function handleChipClick() {
    setBuysOrSales((oldState) => !oldState);
  }

  useEffect(() => {
    const localSocialData = JSON.parse(
      window.localStorage.getItem("socialData")
    );

    async function getData() {
      const socialData = await axios.get("/api/requests/nfts/getSocialData");
      window.localStorage.setItem("socialData", JSON.stringify(socialData));
      setRefresh((oldState) => !oldState);
    }

    if (localSocialData === null) {
      console.log(
        "No data, fetching from db and passing to main page state :("
      );
      getData();
    } else {
      console.log("Got data back from main page state , kinda' cached now");
      const allTransactions = [];
      let optionArray = localSocialData.data.buyTransactionsGroupedByAddress;
      if (!buysOrSales) {
        optionArray = localSocialData.data.sellTransactionsGroupedByAddress;
      }
      optionArray.forEach((buyTransactionsArrayForOneAddress) => {
        buyTransactionsArrayForOneAddress.data.forEach((transaction) => {
          allTransactions.push(transaction);
        });
      });
      const finalTransactions = allTransactions.sort(
        (a, b) => Number(b.block_number) - Number(a.block_number)
      );
      setData(finalTransactions);
    }
  }, [buysOrSales, refresh]);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!data && <Loader />}
      {data && (
        <Box>
          <Box
            elevation={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // ml: 9,
              gap: 2,
              width: "100%",
              pb: 2,
              backgroundColor: "background.paper",
            }}
          >
            <Box display="flex" gap={1}>
              <Chip
                variant={!buysOrSales ? "outlined" : "filled"}
                color="primary"
                sx={{ cursor: "pointer" }}
                label={
                  <Typography variant="p" letterSpacing={1}>
                    buys
                  </Typography>
                }
                onClick={handleChipClick}
              />

              <Chip
                variant={buysOrSales ? "outlined" : "filled"}
                color="primary"
                sx={{ cursor: "pointer" }}
                label={
                  <Typography variant="p" letterSpacing={1}>
                    sales
                  </Typography>
                }
                onClick={handleChipClick}
              />
            </Box>

            <Box>
              <IconButton onClick={handleRefresh}>
                <Refresh />
              </IconButton>
            </Box>
          </Box>
          <Box
            key={Math.random()}
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {data.map((transaction) => {
              let name;
              if (
                transaction.buyer.slice(0, 6) === "0xce90" ||
                transaction.seller.slice(0, 6) === "0xce90"
              ) {
                name = "Snoop Dogg";
              }
              if (
                transaction.buyer.slice(0, 6) === "0xc02f" ||
                transaction.seller.slice(0, 6) === "0xc02f"
              ) {
                name = "Elliotrades";
              }
              if (
                transaction.buyer.slice(0, 6) === "0x8f7c" ||
                transaction.seller.slice(0, 6) === "0x8f7c"
              ) {
                name = "Gary Vee";
              }

              let now = new Date();
              let transactionTime = new Date(transaction.timestamp);
              let differenceInDays =
                (now.getTime() - transactionTime.getTime()) /
                (1000 * 3600 * 24);
              return (
                <SocialNft
                  transaction={transaction}
                  name={name}
                  differenceInDays={differenceInDays}
                  key={Math.random()}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Social;
