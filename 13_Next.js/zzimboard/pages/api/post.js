import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await connect;
  const db = await client.db('board');

  if (req.method === 'POST') {
    const title = req.body.title;
    const content = req.body.content;

    // 데이터 유효성 검사
    if (!title) {
      return res.status(500).json({
        flag: false,
        message: '제목을 입력하세요'
      })
    }

    // DB 에러 예외 처리
    try {
      await db.collection('post').insertOne({ title, content });
      // json으로 응답
      // res.json({
      //   message: '등록ok'
      // });
      
      // 응답과 동시에 페이지를 이동시키기
      res.redirect(302, '/list'); // 응답코드 생략 시 기본값: 307(Temporary)  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        flag: false,
        message: '등록 실패'
      })
    }
  }


}