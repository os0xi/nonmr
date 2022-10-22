import { CollectionsOutlined, SubtitlesOffOutlined } from "@mui/icons-material";

const { MongoClient, Collection } = require("mongodb");
const MONGO_STRING = process.env.MONGO_STRING;

export default async function handler(req, res) {
  console.log("into handler");
  const client = new MongoClient(MONGO_STRING);

  const database = client.db(`BUYS`);

  const collections = await database.listCollections().toArray();

  const collectionNames = collections.map((collection) => collection.name);

  let allAddressesBuys = [];

  for (let i in collectionNames) {
    const collectionName = collectionNames[i];
    console.log(collectionName);
    const collectionA = await database.collection(collectionName);
    allAddressesBuys.push({ collectionName: collectionName, data: [] });
    const cursor = await collectionA.find({});
    await cursor.forEach((cursor) => allAddressesBuys[i].data.push(cursor));
  }
  res.status(200).json({ buyTransactionsGroupedByAddress: allAddressesBuys });
}
