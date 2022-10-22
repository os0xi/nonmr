import { useTheme } from "@emotion/react";
import { Chip, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import SocialNft from "../Components/SocialNft";

function Social({ mainData, setMainData }) {
  const [data, setData] = useState();
  const [buysOrSales, setBuysOrSales] = useState(true);
  const theme = useTheme();

  function handleChipClick() {
    setBuysOrSales((oldState) => !oldState);
  }

  useEffect(() => {
    async function getData() {
      const socialData = await axios.get("/api/requests/nfts/getSocialData");
      console.log(socialData);
      setMainData(socialData);
    }

    if (!mainData) {
      console.log(
        "No data, fetching from db and passing to main page state :("
      );
      getData();
    } else {
      console.log("Got data back from main page state , kinda' cached now");
      const allTransactions = [];
      let optionArray = mainData.data.buyTransactionsGroupedByAddress;
      if (!buysOrSales) {
        optionArray = mainData.data.sellTransactionsGroupedByAddress;
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
  }, [mainData, setMainData, buysOrSales]);
  return (
    <Box>
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
                ml: 9,
                gap: 2,
                width: "200px",
                py: 2,
                backgroundColor: "background.paper",
              }}
            >
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
    </Box>
  );
}

export default Social;
