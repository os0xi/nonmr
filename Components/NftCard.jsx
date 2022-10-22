import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

function NftCard({ nft, user }) {
  const nftMetadata = JSON.parse(nft.metadata);
  console.log(nft.price);
  let image;
  if (nftMetadata) {
    image = nftMetadata.image;
    if (image.slice(0, 5) === "ipfs:") {
      image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
  }
  const theme = useTheme();
  return (
    <>
      {nftMetadata && (
        <Card>
          <CardHeader
            title={<Typography>{nft.name}</Typography>}
            action={<Typography>{nft.price}</Typography>}
          />
          <CardContent>
            <img src={image} alt="" style={{ width: 200, height: "auto" }} />
          </CardContent>
        </Card>
      )}
    </>
  );

  // if (metadata !== null) {
  //     console.log(nft);
  //     let image = metadata.image;
  //     let price = !nft.lastNftPrice ? null : nft.lastNftPrice.price;

  //     if (image)
  //       if (image.slice(0, 5) === "ipfs:") {
  //         image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
  //       }
  //     return (
  //       <Card key={Math.random()} sx={{ width: 300 }}>
  //         <CardHeader
  //           avatar={
  //             <Avatar
  //               sx={{
  //                 backgroundColor: "primary.dark",
  //                 width: 50,
  //                 height: 50,
  //               }}
  //               size="large"
  //             >
  //               <Typography>{user.slice(2, 4)}</Typography>
  //             </Avatar>
  //           }
  //           title={
  //             <Typography
  //               variant="h6"
  //               fontWeight={600}
  //               fontSize={16}
  //               sx={{
  //                 ...theme.customElements.gradientText,
  //               }}
  //             >
  //               {nft.name}
  //             </Typography>
  //           }
  //           action={
  //             price && (
  //               <Box mb={2}>
  //                 <Typography
  //                   variant="p"
  //                   color="primary"
  //                   fontWeight={700}
  //                   fontSize={16}
  //                 >
  //                   {price ? `${price}` : "Free"}
  //                 </Typography>
  //               </Box>
  //             )
  //           }
  //           subheader={
  //             <Typography variant="p" color="grey.500" fontSize={12}>
  //               {metadata.name}
  //             </Typography>
  //           }
  //         />
  //         <CardContent>
  //           <Box mb={2}>
  //             <Typography
  //               variant="p"
  //               color="primary"
  //               fontWeight={700}
  //               fontSize={16}
  //             >
  //               {price ? `${price}` : "Free"}
  //             </Typography>
  //           </Box>
  //           <Box width="100%">
  //             <img
  //               src={image}
  //               alt=""
  //               style={{ width: "100%", minWidth: "250px" }}
  //             />
  //           </Box>
  //         </CardContent>
  //       </Card>
  //     );
  //   } else {
  //     return <></>;
  //   }
}

export default NftCard;
