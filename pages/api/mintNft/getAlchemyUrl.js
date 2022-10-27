const alchemyKey = process.env.ALCHEMY_KEY;
export default async function handler(req, res) {
  res.status(200).json({ ALCHEMY_KEY: alchemyKey });
}
