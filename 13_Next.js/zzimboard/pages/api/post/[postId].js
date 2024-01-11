import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

  const client = await connect;
  const db = await client.db('board');
  // URL 파라미터 확인
  console.log(req.query);




  // 삭제
  if (req.method === 'DELETE') {
    try {
      const postId = req.query.postId;
      console.log(postId);
      const resulte = await db.collection('post').deleteOne({ _id: new ObjectId(postId) });

      if (resulte.deletedCount === 0) {
        throw new Error('삭제 실패');
      }
  
  
      res.json({
        flag: true,
        message: 'ok'
      });
      
    } catch (err) {
      console.error(err);
      res.json({
        flag: false,
        message: 'ok'
      });
    }
  }
}