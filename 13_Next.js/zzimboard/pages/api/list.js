import { connect } from "@/database";

export default async function handler(req, res) {
  const client = await connect;
  const db = await client.db('board');
  const resulte = await db.collection('post').find({}).toArray();
  console.log(resulte);
  res.json({
    message: 'ok',
    resulte
  });
}