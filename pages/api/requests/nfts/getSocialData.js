const { MongoClient } = require("mongodb");
const MONGO_STRING = process.env.MONGO_STRING;

export default async function handler(req, res) {
  console.log("into handler");
  const client = new MongoClient(MONGO_STRING);

  const buysDatabase = client.db(`BUYS`);
  const sellsDatabase = client.db(`SELLS`);

  const buysCollections = await buysDatabase.listCollections().toArray();
  const sellsCollections = await sellsDatabase.listCollections().toArray();

  const buysCollectionsNames = buysCollections.map(
    (collection) => collection.name
  );
  const sellsCollectionsNames = sellsCollections.map(
    (collection) => collection.name
  );

  let allAddressesBuys = [];
  let allAddressesSells = [];

  for (let i in sellsCollectionsNames) {
    const collectionName = sellsCollectionsNames[i];
    console.log(collectionName);
    const collectionA = await sellsDatabase.collection(collectionName);
    allAddressesSells.push({ collectionName: collectionName, data: [] });
    const currentAddressTransactions = await collectionA.find({});
    await currentAddressTransactions.forEach((transaction) =>
      allAddressesSells[i].data.push(transaction)
    );
  }

  for (let i in buysCollectionsNames) {
    const collectionName = buysCollectionsNames[i];
    console.log(collectionName);
    const collectionA = await buysDatabase.collection(collectionName);
    allAddressesBuys.push({ collectionName: collectionName, data: [] });
    const currentAddressTransactions = await collectionA.find({});
    await currentAddressTransactions.forEach((transaction) =>
      allAddressesBuys[i].data.push(transaction)
    );
  }
  res.status(200).json({
    buyTransactionsGroupedByAddress: allAddressesBuys,
    sellTransactionsGroupedByAddress: allAddressesSells,
  });
}
