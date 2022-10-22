import axios from "axios";

export default async function handler(req, res) {
  const address = "0x8f7ceefaa1ff5dfd125106ff9e219eff360d57aa";

  const options = {
    method: "GET",
    url: "https://opensea13.p.rapidapi.com/events",
    params: {
      only_opensea: "false",
      account_address: " 0x8f7ceefaa1ff5dfd125106ff9e219eff360d57aa",
      event_type: " successful",
    },
    headers: {
      "X-RapidAPI-Key": "b4027c1201mshccf348b888d8b68p1c7765jsn337dcddf9965",
      "X-RapidAPI-Host": "opensea13.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      res.send(error);
    });
}
