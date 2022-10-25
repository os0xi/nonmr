import { useTheme } from "@emotion/react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { grey, green, deepPurple } from "@mui/material/colors";
import React from "react";

function SocialNft({ transaction, name, differenceInDays }) {
  const theme = useTheme();
  return (
    <Card
      onClick={() => {
        window.open(transaction.permalink);
      }}
      sx={{
        width: 320,
        height: 440,
        mt: 2,
        p: 2,
        display: "flex",
        backgroundColor: theme.palette.mode === "light" ? grey[50] : grey[900],
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "light" ? grey[200] : grey[800],
          cursor: "pointer",
        },
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* prices */}
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography
            color={theme.palette.mode === "dark" ? grey[200] : "primary.dark"}
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            {Number(transaction.price) !== 0 &&
              "$ " +
                Math.round(
                  parseFloat(
                    Number(transaction.price) * Number(transaction.token_price)
                  )
                )}
          </Typography>
          <Typography
            color={theme.palette.mode === "dark" ? grey[400] : "primary.dark"}
            fontWeight={600}
            sx={{ ...theme.customElements.gradientText, mb: 2 }}
          >
            {`Ξ `}
            {transaction.price}
          </Typography>
        </Box>
        {/* name */}
        <Typography
          color={theme.palette.mode === "dark" ? grey[200] : "primary.dark"}
          fontSize={18}
          fontWeight={600}
          // sx={{ ...theme.customElements.gradientText }}
        >
          {transaction.item_name}
        </Typography>
        {/* content */}
        <Box
          sx={{
            width: "200px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={transaction.image}
            alt="nft"
            style={{ maxWidth: 200, maxHeight: 200 }}
          />
        </Box>
        <Typography
          color="primary.light"
          sx={{ mt: 2 }}
          fontSize={14}
        >{`block number: ${transaction.block_number}`}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            fontWeight={600}
            sx={{ ...theme.customElements.gradientText, mb: 0 }}
          >
            {name}
          </Typography>
          <Typography
            fontWeight={600}
            sx={{ ...theme.customElements.gradientText, mb: 0 }}
          >{`${Math.round(differenceInDays)} days ago`}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SocialNft;
